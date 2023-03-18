import React from 'react';
import About from './about';
import Cars from './Cars';




const LandingPage = () => {
    return (
        <div>
            <div className="bg-cover bg-center h-screen flex justify-center items-center flex-col"
                style={{ backgroundImage: `url(${require('../assets/porcheoptimised.jpg')})` }}>
                <h1 className="text-5xl  text-white"
                    style={{ textShadow: '1px 1px 0 #000' }}>Tommin Autot</h1>
                <p className="text-2xl text-white"
                    style={{ textShadow: '1px 1px 0 #000' }}>Tule kokeilemaan</p>
            </div>
            <About />
            <Cars />
        </div>
    );
};

export default LandingPage;
