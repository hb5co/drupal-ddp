Meteor.publish('ddpnodes', function() {
  return drupalDdpNodes.find({});
});

Meteor.publish('ddptaxonomies', function() {
  return drupalDdpTaxonomies.find({});
});