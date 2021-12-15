const passport = require('passport');

module.exports = app => {
// Start of exports
    app.get('/auth/google', passport.authenticate('google', {
            // google scope
            scope: ['profile', 'email']
        })
    );
    
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        // function attached to req by passport
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
// End of exports
};

