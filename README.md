## Drupal-Ddp
Drupal and Meteor integration over DDP. This meteor package requires the [Drupal DDP drupal module](https://www.drupal.org/sandbox/bfodeke/2354859) to function.

Once set up, it allows Drupal's Node, Taxonomy, and User objects to be synced over to your meteor application.

<img src="https://www.drupal.org/files/project-images/Drupal%20DDP%20Architecture.png" />

### Installation
Install package `meteor add hb5:drupal-ddp`

### Settings.json
A settings.json file is required during the startup of your meteor app.

Below is a sample `settings.json` file to be included in the root of your Meteor project.

    {
      "public": {
        "drupal_ddp_access_private_files": true
      },
      "drupal_ddp": {
        "debug_data": true,
        "drupal_url": "http://your_drupal_url",
        "restws_user": "restws_xxxxx",
        "restws_pass": "your_password",
        "restws_read_user": "restws_readonly_xxxxx",
        "restws_read_pass": "your_password",
        "simple_security": true,
        "simple_security_token": "your_security_token"
      }
    }

**Notes**

- `debug_data: true` will enable you to see some debug data in the console.
- `ddp_url` should be the url of your Drupal website (no trailing slash).
- To enable writing data back to Drupal, a user must be created in Drupal prefixed with `restws_`, and should have read and write access to the content types you wish to write back to.
  - Create your own restws user and add that in place of `restws_xxxxx` to your settings.json file.
  - Add the restws password from Drupal in place of `your_password`.
- To enable simple security to prevent unauthorized ddp requests to your Meteor app, set `simple_security` to `true`.
  - Simple Security Token (`simple_security_token`) is a token that should be set within your Drupal site.

**Private Files**

- To enable drupal's private files to be accessible to Meteor, your **Drupal** and your **Meteor** sites must be on the same domain.
  - Create a new user in Drupal with the `restws_readonly_` prefix that ONLY has rights to view private files.
  - Add your new username and password to your settings.json file.
  - Set `drupal_ddp_access_private_files` to `true` in the public section in your settings.json file.

_Run your meteor using the settings.json file by running `meteor --settings settings.json` at the root of your app._


### Registering Content Types
In order to save content from Drupal into your MongoDB, you must create a collection and register it.


    Articles = new Mongo.Collection('article');
    Meteor(isServer()) {
      DrupalDdp.registerType('article', Articles);
    }

Where ***`article`*** corresponds to your Drupal content type machine name.

### Writing data back to Drupal
Currently, only nodes are supported for writing back to Drupal.

In order to write node data back to Drupal, pass a single (node) object to the `updateNodeInDrupal` method:

`Meteor.call('updateNodeInDrupal', object);`

### Users
If the `drupal_ddp_users` module is enabled, user accounts can sync over to Meteor from Drupal. Once synced, a user can login to Drupal and Meteor with the same credentials.

### Syncing Existing Content
Existing Node, User and Taxonomy data can be synced to Meteor from the Drupal Module settings page.

Users can be synced from Drupal, but their accounts won't be verified in Meteor until a password change happens from Drupal. Once a user password is updated in Drupal, then you can login to Drupal & Meteor with the same password.

