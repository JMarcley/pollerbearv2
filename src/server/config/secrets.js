/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/

module.exports = {
  // Find the appropriate database to connect to, default to localhost if not found.
  db: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://localhost/pollerbearv2',
  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',
  google: {
    clientID: process.env.GOOGLE_CLIENTID || '403135066213-8ckqckfnmuop2ba82u561q37j47er5bq.apps.googleusercontent.com',
    clientSecret: process.env.GOOGLE_SECRET || 'ttZnX6UBwMuZv-QfJkVo_LxZ',
    callbackURL: process.env.GOOGLE_CALLBACK || "/auth/google/callback"
  },
  facebook: {
    clientID: process.env.FACEBOOK_APPID || '803289859781288',
    clientSecret: process.env.FACEBOOK_SECRET || '3936577c85fb12ec2a690bbd9008cb82',
    callbackURL: process.env.FACEBOOK_CALLBACK || "/auth/facebook/callback"
  }
};
