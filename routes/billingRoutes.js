// Connected to index.js
const keys = require('../config/keys');
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
    app.post('/api/stripe', async (req, res) => {
        // Stripe back end
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });
        // give the user 5 credits
        req.user.credits += 5;
        // save the user to the db
        const user = await req.user.save();
        // send the user back
        res.send(user);
    });
};