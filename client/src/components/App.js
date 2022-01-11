// App.js file is used for initial view layer
// "Import" because we are making use of web pack and babel
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
// Needed to connect react to redux action creators
import { connect } from 'react-redux';
import * as actions from '../actions';
import './stylesheets/App.css';

import Header from './Header';
import Landing from './Landing';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


// Class based so we can use lifecycle methods (fetch current user action happens when page loads)
class App extends Component {
    // Everytime the page renders
    componentDidMount(){
        // Execute the fetchUser action creator
        this.props.fetchUser();
    }

    render(){
        return (
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
        );
    }
}

// Connect function used to interact with redux - actions assigned to App as props
export default connect(null, actions)(App);