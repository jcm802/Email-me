// node relies on common js modules (not ES6)
const express           = require('express'),
      mongoose          = require('mongoose'),
      cookieSession     = require('cookie-session'),
      passport          = require('passport'),
      keys              = require('./config/keys'),
      bodyParser       = require('body-parser');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);
                    
const app = express();

app.use(bodyParser.json());
app.use(
    cookieSession({
        // Required properties: -
        // expire after 30 days
        maxAge: 30 * 24 * 60 * 60 * 1000,
        // encrypt cookie
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// Dynamic port binding with heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server running on port 5000...');
});