Meteor.methods({
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
        Meteor.users.update({"profile.uid": data.content.uid}, {$set: {"emails.0.verified" :true}});
      }
      else if(data.content.delete_content){
        // Delete existing taxonomies.
        drupalDdpUsers.remove({"content.tid": data.content.tid});
      }
      else {
        // Update existing taxonomies.
        drupalDdpUsers.update({"content.tid": data.content.tid},{$set:{content:data.content}});
      }
    }
  }
});
