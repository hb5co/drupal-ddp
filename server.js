Meteor.methods({
  // Accept node inserts and updates from Drupal.
  DrupalSaveNode: function (data) {
    console.log(data);
    // Handle Nodes
    if(data.content.ddp_type == 'node'){
      if (data.content.is_new) {
        // Add new posts.
        drupalDdpNodes.insert(data);
      }
      else if(data.content.delete_content){
        // Delete existing posts.
        drupalDdpNodes.remove({"content.nid": data.content.nid},{$set:{content:data.content}});
      }
      else {
        // Update existing posts.
        drupalDdpNodes.update({"content.nid": data.content.nid},{$set:{content:data.content}});
      }
    }

    // Handle Taxonomies
    if(data.content.ddp_type == 'taxonomy'){
      if (data.content.is_new) {
        drupalDdpTaxonomies.insert(data);
      }
      else if(data.content.delete_content){
        // Delete existing taxonomies.
        drupalDdpTaxonomies.remove({"content.tid": data.content.tid},{$set:{content:data.content}});
      }
      else {
        // Update existing taxonomies.
        drupalDdpTaxonomies.update({"content.tid": data.content.tid},{$set:{content:data.content}});
      }
    }
  }
});

