DrupalDdp = {
  collections: {},
  taxonomies: {},
  registerType: function(key, collection) {
    this.collections[key] = collection;
  },
  registerTaxonomy: function(key, collection) {
    this.taxonomies[key] = collection;
  }
};

