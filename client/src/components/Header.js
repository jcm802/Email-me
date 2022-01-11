import React, { Component } from 'react';
// Required to access fetch_user from store
import { connect } from 'react-redux';
// Link used when using react router as a single page not loading whole html documents
import { Link } from 'react-router-dom';
// Styling
import './stylesheets/Header.css';
// Includes Stripe Component
import Payments from './Payments';
// Class based component because the header will change based on state, more organised approach than if functional was used
class Header extends Component {
    // Helper method to show and hide elements if logged in or not
    // (Conditional Rendering)
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google<i className="fab fa-google"></i></a></li>;
            default:
                return [
                    // if you are providing JSX elements in array, they must have a unique key
                <li key="1"><Payments/></li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
                ];
        }
    }

    render(){
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                    to={this.props.auth ? '/surveys' : '/'} 
                    className="left brand-logo"
                    >
                        EmailMe!
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
               
            </nav>
        );
    }
}
// function mapStateToProps(state){ // state has one property (auth) made in the combineReducers function
//     return { auth: state.auth }; 
// }

// mapStateToProps can be destructured to:
function mapStateToProps({auth}){
    return { auth }; 
}
export default connect(mapStateToProps)(Header);