import React from 'react';
import About from './about';
import Cars from './Cars';




const LandingPage = () => {
    return (
        <div>
            <div className="bg-cover bg-center h-screen grid place-items-center"
                style={{ backgroundImage: `url(${require('../assets/porcheoptimised.jpg')})` }}>
                <div>
                    <h1 className="text-6xl text-white text-center"
                        style={{ textShadow: '1px 1px 0 #000' }}>Tommin Lainakaarat</h1>
                    <p className="text-2xl text-white text-center"
                        style={{ textShadow: '1px 1px 0 #000' }}>Vuokraa jo tänään!</p>
                </div>
            </div>
            <About />
            <Cars />
        </div>
    );
};

export default LandingPage;
