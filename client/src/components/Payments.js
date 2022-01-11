import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import './stylesheets/Payments.css';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render(){
        //  Default Amount (<amount>) is in U.S. cents
        // <token> is a callback which waits for an authorisation token from Stripe representing the charge
        return (
            // Component provided by Stripe, props handled by them
            <StripeCheckout
                name="EmailMe"
                description="Pay $5 for 5 email credits"
                amount={500}
                token={token => this.props.handleToken(token)}
                // Key injected in when react app is built with create-react-app
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                {/* Child component for customised button styling */}
                <button className="btn blue">
                    Add Credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments);