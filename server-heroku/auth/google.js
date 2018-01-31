const passport = require('koa-passport');
const Router = require('koa-router');
const oauthRouter = new Router();
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { db } = require('../db/models');

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.')

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  }

  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id
    const firstName = profile.displayName.split(' ')[0];
    const lastName = profile.displayName.split(' ')[1];
    const email = profile.emails[0].value

    db.models.user.find({where: {googleId}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : db.models.user.create({firstName, lastName, email, googleId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done)
  })

  passport.use(strategy)

  oauthRouter.get('/', passport.authenticate('google', {scope: 'email'}))

  oauthRouter.get('/callback', passport.authenticate('google', {
    failureRedirect: '/auth/login' //currently unknown regarding react-native failure
  }), (ctx, next) => {
    ctx.redirect('OAuthLogin://login?user=' + JSON.stringify(ctx.state.user));
  })

}

module.exports = oauthRouter;
