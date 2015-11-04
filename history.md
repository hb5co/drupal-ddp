v.0.1.3
----
- Changed settings.json variable name from `ddp_url` to `drupal_ddp` for added
clarity of its function.
- Added more debugging output when `debug` is set to `true`.
- `DrupalSaveNode` method now returns `nid/uid/tid` and `timestamp` to help with
queueing of posts from Drupal -> Meteor.
- Added dependency on `matteodem:server-session` package. Sesson tokens are now
stored in server session to reduce the amount of concurrent active sessions
for the `restws_` user in Drupal when data is updated from Meteor -> Drupal.

v.0.1.4
----
- Throwing a Meteor error if user tries to sync a term in a vocab that hasn't been registered yet.
- Returning FALSE on `updateNodeInDrupal` when an error occurs so code that call that method can better use the return data.
