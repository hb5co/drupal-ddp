drupalDdpNodes = new Mongo.Collection('drupal_ddp_nodes');

if (Meteor.isServer) {
  Meteor.methods({
    // Accept node inserts and updates from Drupal.
    DrupalSaveNode: function (data) {
      if (data.node.is_new) {
        // Add new nodes.
        drupalDdpNodes.insert(data);
      }
      else {
        // Update existing nodes.
        drupalDdpNodes.update({"node.nid": data.node.nid},{$set:{node:data.node}});
      }
    }
  });
};

