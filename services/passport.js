const passport          = require('passport'),
      GoogleStrategy    = require('passport-google-oauth20').Strategy,
      keys              = require('../config/keys'),
      mongoose          = require('mongoose'),
      User              = mongoose.model('users');

      // takes user model retrieved and serializes user into browser
passport.serializeUser((user, done) => {
    // takes mongo id for user (universal no matter the sign in method (fb, twitter etc,))
    done(null, user.id);
});
    // deserialize user back into a model so the server can recognise it
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    // User sent here after granting permissions
    callbackURL: '/auth/google/callback',
    proxy: true
}, 
(accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
        // if there is a user
        .then((existingUser) => {
            if(existingUser){
                // do nothing, show passport the existing user and finish the process
                done(null, existingUser);
            } else {
                // if user doesn't exist create a new user instance
                new User({ googleId: profile.id })
                    .save()
                    // take the newly created user data and tell passport so the process can finish
                    .then(user => done(null, user));
            }
        })
    })
);