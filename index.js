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
// After running the client build, it represents a saved version of our code base 
// at one point in time. Heroku needs this for reference to work
//  - On top of this, when you deploy you : - 
//          - Push to heroku
//          - Tell heroku to install *all* dependencies for the client project
//          - Heroku then builds client project
// - To do this : - ref: https://devcenter.heroku.com/articles/nodejs-support#customizing-the-build-process
//          - *Important: This line must be written after the line <dev: npm run...> as postbuild is supposed to run after heroku has built our server
//          - Add a postbuild script to the package.json file (this ensures these steps only take place when running on heroku)
//          - Steps
//          - 1. Give heroku additional instruction to install client dependencies
//          - 2. Tell heroku to run 'npm run build' from inside our client dir
if(process.env.NODE_ENV === 'production'){
    // Firstly: Serve up production assets (Main.js, Main.css)
    // Desc: if any get request comes into express and is not recognised as a route 
    // look in 'client/build' to see if there is a specific file that the request seeks
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
    console.log('Server running...');
});