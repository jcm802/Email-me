// node relies on common js modules (not ES6)
const express           = require('express'),
      mongoose          = require('mongoose'),
      cookieSession     = require('cookie-session'),
      passport          = require('passport'),
      keys              = require('./config/keys'),
      bodyParser        = require('body-parser');
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

// Configure express correctly for production only (Heroku)
if(process.env.NODE_ENV === 'production'){
    // Firstly: Serve up production assets (Main.js, Main.css)
    // Desc: if any get request comes into express and is not recognised as a route 
    // look in 'client/build' to see if there is a file that the request seeks
    app.use(express.static('client/build'));

    // Secondly: If there is no file in 'client/build' found do the following...
    // Desc: if a route is not recognised by express assume react router is responsible
    // for that route (not express), send index.html to the browser as there are no specific asset files found
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}

// Dynamic port binding with heroku
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server running on port 5000...');
});