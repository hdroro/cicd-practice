const { Strategy: GoogleStrategy } = require('passport-google-oauth2');
const { createUserByOauth } = require('../services/user.service');
require('dotenv').config();

const configurePassport = (passport) => {
  passport.use(new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const [user, created] = await createUserByOauth(profile);
        return done(null, user);
      } catch (err) {
        console.error('Error during Google authentication:', err);
        return done(err, null);
      }
    }
  ));
};

module.exports = { configurePassport };
