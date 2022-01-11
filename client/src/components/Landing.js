import React from 'react';
import './stylesheets/Landing.css';
import video from './video/EmailMeVideoEdited.mp4';
import Payments from './Payments';

const Landing = (props) => {
    return (
        
        <div>
            <video className='videoTag' autoPlay loop muted>
            <source src={video} type='video/mp4' />
            </video>
            <div className="marketingText">
            <h1 className="brand-logo">EmailMe!</h1>
            <p>The Easiest Way To Get Feedback From Your Customers</p>
            </div>
            
        </div>
    );
}

export default Landing;