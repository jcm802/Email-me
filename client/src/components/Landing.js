import React from 'react';
import './stylesheets/Landing.css';
import video from './video/EmailMeVideoEdited.mp4';

const Landing = () => {
    return (
        <div>
            <video className='videoTag' autoPlay loop muted>
            <source src={video} type='video/mp4' />
            </video>
            <div className="marketingText">
            <h1 className="brand-logo">EmailMe!</h1>
            <p>The Easy Way To Collect Feedback From Your Users</p>
            </div>
            
        </div>
    );
}

export default Landing;