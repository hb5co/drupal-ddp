Package.describe({
  name: 'hb5:drupal-ddp',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/hb5co/drupal-ddp',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  var both = ['client', 'server'];

  // Packages for Client & Server
  api.use('mongo', both);

  // Files for Client & Server
  api.addFiles([
    'collections/nodes.js', 
    'collections/taxonomies.js'
    ], both);

  // Files for Server
  api.addFiles([
    'server/methods.js',
    'server/publications.js',
    ], 'server');

  // Publish Collections to Client
  api.export('drupalDdpNodes');
  api.export('drupalDdpTaxonomies')
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles(['server.js'], 'server');
  api.addFiles('tests.js');
});
