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
    async (accessToken, refreshToken, profile, done) => {
        // -- Checks if the user already exists, log them in if they are not already in the db and don't log them if they already in the db --
        const existingUser = await User.findOne({ googleId: profile.id })
        if(existingUser) return done(null, existingUser);
        const user = await new User({ googleId: profile.id })
        .save()
        done(null, user);
    }
)
);