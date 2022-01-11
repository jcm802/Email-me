// Connected to index.js
// Requires stripe npm module
// Requires stripe code specifically for generating credit card charge requests
const stripe = require('stripe');
// To find it go to: -
//      - Stripe API Docs stripe.com/docs/api/charges
//      - Core Resources
//      - Charges
//      - Create A Charge
//      - Select node.js as your library and the code will be there for reference
module.exports = app => {
    // Finalises charge and updates user credits on the front end
    app.post('/api/stripe', (req, res) => {
        
    });
};