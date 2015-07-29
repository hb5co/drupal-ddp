if (Meteor.isClient) {
  Meteor.startup(function () {
    if (Meteor.settings.public.drupal_ddp_access_private_files === true) {
      Meteor.call('getDrupalDdpToken', 'read', function(err, response) {
        if (!err) {
          // Getting the upper level domain of the current site.
          var urlParts = location.hostname.split('.');
          var domain = _.last(urlParts, 2).join('.');

          // Set a session cookie.
          var cookieParts = response.cookie.split(';');

          // Loop through parts of the cookie to make it
          // work across subdomains.
          _.each(cookieParts, function(num, index){
            cookieSegment = num.split('=');
            if ($.trim(cookieSegment[0]) === 'domain') {
              // Set the domain equal to the tld.
              var cookieDomain = ' domain=' + domain;
              cookieParts[index] = cookieDomain;
            }

            // If the 'HttpOnly' flag is set in the cookie,
            // remove it so the cookie can be set via javascript.
            if ($.trim(cookieSegment[0]) === 'HttpOnly') {
              cookieParts.splice(index, 1);
            }
          });

          // Join all the cookie parts back together.
          var sessionCookie = cookieParts.join(';');
          document.cookie = sessionCookie;
        }
      });
    }
  });
}