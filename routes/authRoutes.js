const passport = require('passport');

module.exports = app => {
// Exports start
    app.get('/auth/google', passport.authenticate('google', {
            // google scope
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google'),
        // redirect to another route
        (req, res) => {
            res.redirect('/surveys');
        }
    );

    app.get('/api/logout', (req, res) => {
        // Logout function attached to req object by passport
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
// Exports end
};

