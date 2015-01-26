Posts = new Mongo.Collection('posts');

if (Meteor.isServer) {
  Meteor.methods({
    // Accept post node inserts and updates from Drupal.
    Post: function (data) {
      if (data.node.is_new) {
        // Add new posts.
        Posts.insert(data);
      }
      else {
        // Update existing posts.
        Posts.update({"node.nid": data.node.nid},{$set:{node:data.node}});
      }
    }
  });
};

