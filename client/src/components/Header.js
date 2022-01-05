import React, { Component } from 'react';
// required to access fetch_user from store
import { connect } from 'react-redux';
// Link used when using react router as a single page not loading whole html documents
import { Link } from 'react-router-dom';
import './stylesheets/Header.css'
// Class based component because the header will change based on state, more organised approach than if functional was used
class Header extends Component {

    // helper method to show and hide elements if logged in or not
    renderContent(){
        switch(this.props.auth){
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google<i class="fab fa-google"></i></a></li>;
            default:
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render(){
        console.log(this.props);
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
function mapStateToProps(state){ // state has one property (auth) made in the combineReducers function
    return { auth: state.auth }; 
}
// mapStateToProps can be destructured to:
// function mapStateToProps({auth}){
//     return { auth }; 
// }
export default connect(mapStateToProps)(Header);