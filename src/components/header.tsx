import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-transparent z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-bold ">
                        Home
                    </Link>
                    <Link to="/cars" className="text-xl font-bold ">
                        Cars
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-xl font-bold ">
                        Log in
                    </Link>
                    <Link
                        to="/register"
                        className="text-xl font-bold bg-white text-black py-2 px-4 rounded"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </header>
    );
};


export default Header;
