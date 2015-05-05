## Drupal-Ddp
Drupal and Meteor integration over DDP. This meteor package requires the [Drupal DDP drupal module](http://drupal.org/project/drupal_ddp) to function.

Once set up, it allows Drupal's Node, Taxonomy, and User objects to be synced over to your meteor application.

### Installation
Install package `meteor add hb5:drupal-ddp`

### Settings.json
A settings.json file is required during the startup of your meteor app. 

Below is a sample `settings.json` file to be included in the root of your Meteor project.

	{
		"drupal_ddp": {
			"debug_data": true,
			"ddp_url": "http://drupalddp.dev",
			"restws_user": "restws_xxxxx",
			"restws_pass": "your_password"
		}
	}

**Notes**

- `debug_data: true` will enable you to see some debug data in the console.
- `ddp_url` should be the url of your Drupal website (no trailing slash).
- To enable writing data back to Drupal, a user must be created in Drupal prefixed with `restws_`, and should have read and write access to the content types you wish to write back to.
	- Create your own restws user and add that in place of `restws_xxxxx` to your settings.json file.
	- Add the restws password from Drupal in place of `your_password`.


### Registering Content Types
In order to save content from Drupal into your MongoDB, you must create a collection and register it.


	Articles = new Mongo.Collection('article');
	Meteor(isServer()) { 
		DrupalDdp.registerType('article', Articles); 
	}

Where ***`articles`*** corresponds to your Drupal content type machine name.

### Writing data back to Drupal
Currently, only nodes are supported for writing back to Drupal.

In order to write node data back to Drupal, pass a single object to the `updateNodeInDrupal` method:

`Meteor.call('updateNodeInDrupal', object);`

### Syncing Existing Content
Existing Node, User and Taxonomy data can be synced to Meteor from the Drupal Module settings page.

Users can be synced from Drupal, but their accounts won't be verified in Meteor until a password change happens from Drupal. Once a user password is updated in Drupal, then you can login to Drupal & Meteor with the same password.
