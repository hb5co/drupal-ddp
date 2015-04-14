### drupal-ddp
Drupal and Meteor integration over DDP.

This meteor package requires the Drupal DDP drupal module.

### Methods
Creates a server method to handle pushing node (insert, update, delete) data from Drupal into mongo database.

### Settings.json
In order to enable writing data back to Drupal, the [restws](http://drupal.org/project/restws) module.

The following settings will need to be added to your `settings.json` file.

```
{
  "drupal_ddp": {
  	"debug_data": true,
  	"ddp_url": "http://drupalddp.dev",
    "restws_user": "restws_login",
    "restws_pass": "password"
  }
}
```

`debug_data: true` will enable you to see all coming in and out of your meteor app.

#Setting Drupal DDP on Drupal Site.#

Once you have a working Drupal site going:

### Download Module
`cd` to `sites/all/modules` and run `git clone --branch 7.x-1.x http://git.drupal.org/sandbox/bfodeke/2354859.git`. This will download the drupal_ddp module to you Drupal site.

### Install Node Dependencies
`cd` to the newly downloaded module folder (`sites/all/modules/drupal_ddp`) and run `npm install`.

### Run NodeServer
While in the drupal_ddp module folder, run `node ddp.js`

### Enable Module
Navigate to the *Modules* page in Drupal and enable the module. (http://yourdrupalsite.dev/admin/modules).

### Configure Drupal DDP
*Navigate to Drupal DDP Settings page to configure settings* (http://yourdrupalsite.dev/admin/config/development/ddp-connect)
- Specify `Drupal DDP node server URL`
- Specify `Meteor app URL`
- Select which content types you want to use with Drupal DDP.

### Create content
Creating content that has been selected for use with DDP will pass a json encoded node object over to your meteor app.

