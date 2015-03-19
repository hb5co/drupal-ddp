Meteor.methods({
  base64Encode: function (unencoded) {
    return new Buffer(unencoded || '').toString('base64');
  },
  // Accept node inserts and updates from Drupal.
  DrupalSaveNode: function (data) {
    console.log(data);
    // Handle Nodes
    if(data.content.ddp_type == 'node'){
      var actualColl = DrupalDdp.collections[data.content.type];
      if (!actualColl) {
        throw new Meteor.Error("You haven't registered this type of collection yet.");
      }
      if (data.content.is_new) {
        // Add new posts.
        actualColl.insert(data);
      }
      else if(data.content.delete_content){
        // Delete existing posts.
        actualColl.remove({"content.nid": data.content.nid});
      }
      else {
        // Update existing posts.
        actualColl.upsert({"content.nid": data.content.nid},{$set: data.content});
      }
    }

    // Handle Taxonomies
    if(data.content.ddp_type == 'taxonomy'){
      if (data.content.is_new) {
        drupalDdpTaxonomies.insert(data);
      }
      else if(data.content.delete_content){
        // Delete existing taxonomies.
        drupalDdpTaxonomies.remove({"content.tid": data.content.tid});
      }
      else {
        // Update existing taxonomies.
        drupalDdpTaxonomies.update({"content.tid": data.content.tid},{$set:{content:data.content}});
      }
    }

    // Handle Users
    if(data.content.ddp_type == 'user'){
      if (data.content.is_new) {
        // Create User
        Accounts.createUser({
          username: data.content.name,
          email : data.content.mail,
          password : data.content.pass,
          profile  : {
            first_name: 'First',
            last_name: 'Last',
            uid: data.content.uid,
            roles: data.content.roles,
          }
        });

        // Set account 'verified' to true
        Meteor.users.update({"profile.uid" : data.content.uid}, {$set: {"emails.0.verified" : true}});
        Meteor.users.update({"profile.uid" : data.content.uid}, {$set: {"services.password.bcrypt" : data.content.pass}});
      }
      else if(data.content.delete_content){
        // Delete existing user.
        user_id = Meteor.users.findOne({"profile.uid" : data.content.uid})._id;
        Meteor.users.remove(user_id);
      }
      else {
        // Update existing user.
        // update profile
        // update name & password
        // update username
        // update email
        // update roles
        // Meteor.users.update({"profile.uid" : data.content.uid});

      }
    }
  },
  getDrupalDdpToken: function() {
    var drupalDdpUrl = Meteor.settings.drupal_ddp.ddp_url;
    var options = {
      url: drupalDdpUrl + "/restws/session/token",
      username : Meteor.settings.drupal_ddp.restws_user,
      password : Meteor.settings.drupal_ddp.restws_pass,
    };

    var auth = 'Basic ' + Meteor.call('base64Encode', options.username + ':' + options.password);

    try {
      var result = HTTP.post(options.url, {
        headers: {
          Authorization: auth
        }
      });

      tokenResponse = {
        token: result.content,
        cookie: result.headers['set-cookie'][0],
      }

      return tokenResponse;
    } catch (e) {
      return false;
    }
  },
  updateNodeInDrupal: function(node) {
    tokenCookie = Meteor.call('getDrupalDdpToken');

    // Get node body out of array
    node.content.body =  node.content.body.und[0];

    node = node.content;

    // Remove items in the node that aren't supported for writing
    // via restws in Drupal.
    cleanUpNode = [
      'is_new',
      'vid',
      'uid',
      'ddp_type',
      'comment',
      'changed',
      'tnid',
      'translate',
      'rdf_mapping',
      'revision_timestamp',
      'revision_uid',
      'cid',
      'last_comment_timestamp',
      'last_comment_name',
      'last_comment_uid',
      'comment_count',
      'name',
      'picture',
      'data'
    ];

    $.each(cleanUpNode, function(){
      node.remove(this);
    });

    if (tokenCookie) {
      try {
        baseUrl = Meteor.settings.drupal_ddp.ddp_url;
        endpoint = baseUrl + '/node/' + node.nid; 

        var result = HTTP.put(
          endpoint, 
          {
            headers: {
              'Content-type': 'application/json',
              'X-CSRF-Token': tokenCookie.token,
              'Accept': 'application/json',
              'Cookie': tokenCookie.cookie,
            },
            params: {
              name: 'restws_login',
              pass: 'password',
              form_id: 'user_login_form'
            },
            data: node
          }
        );
        return result;
      } catch (e) {
        return false;
      }
    }
  },
});
