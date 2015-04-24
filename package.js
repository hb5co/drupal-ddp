Package.describe({
  name: 'hb5:drupal-ddp',
  summary: '',
  git: 'https://github.com/hb5co/drupal-ddp',
  version: '0.0.1'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.1');

  var both = ['client', 'server'];

  // Packages for Client & Server
  api.use([
    'mongo',
    'accounts-password'
    ], both);

  // Files for Client & Server
  api.addFiles([
    'collections/nodes.js',
    'collections/taxonomies.js',
    'collections/users.js'
    ], both);

  // Files for Server
  api.addFiles([
    'server/methods.js',
    'server/config.js'
    ], 'server');

  // Publish Collections to Client
  api.export('drupalDdpNodes');
  api.export('drupalDdpTaxonomies');
  api.export('DrupalDdp');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('server');
  api.addFiles('tests.js');
});
