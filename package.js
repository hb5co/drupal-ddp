Package.describe({
  name: 'hb5:drupal-ddp',
  summary: 'Drupal and Meteor integration over DDP',
  git: 'https://github.com/hb5co/drupal-ddp',
  version: '0.0.2'
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
    'collections/taxonomies.js',
    ], both);

  // Files for Server
  api.addFiles([
    'server/methods.js',
    'server/config.js'
    ], 'server');

  // Publish Collections to Client
  api.export('drupalDdpTaxonomies');
  api.export('DrupalDdp');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.addFiles('server/config.js');
  api.addFiles('server/methods.js');
  api.addFiles('tests.js');
});
