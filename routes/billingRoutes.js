// Routes connected to index.js
// ----------------------------
// Keys required by stripe
const keys = require('../config/keys');
// Middleware
const requireLogin = require('../middlewares/requireLogin');
// Requires stripe npm module
const stripe = require('stripe')(// Secret 
    keys.stripeSecretKey);
// Requires stripe code specifically for generating credit card charge requests
// To find it go to:
//      - Stripe API Docs stripe.com/docs/api/charges
//      - Core Resources
//      - Charges
//      - Create A Charge
//      - Select node.js as your library and the code will be there for reference
module.exports = app => {
    // Finalises charge and updates user credits on the front end
    app.post('/api/stripe', requireLogin, async (req, res) => {
        // Stripe back end
        const charge = await stripe.charges.create({
            // Standard charge specified as $5
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            // Source is the token id on the request body
            source: req.body.id
        });
        // give the user 5 credits
        req.user.credits += 5;
        // save the user to the db
        const user = await req.user.save();
        // send the user back in the response
        res.send(user);
    });
};