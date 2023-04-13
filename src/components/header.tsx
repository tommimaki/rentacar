import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const { isLoggedIn, setLoggedIn, isAdmin } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setLoggedIn(false, false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="absolute top-0 left-0 right-0 bg-transparent z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="hidden md:flex items-center space-x-4">
                    <Link to="/" className="text-xl text-shadow shadow-white font-bold">
                        Home
                    </Link>
                    <Link to="/cars" className="text-xl text-shadow shadow-white  font-bold">
                        Cars
                    </Link>
                    {isAdmin && (
                        <Link to="/Adminpanel" className="text-xl  text-shadow shadow-white  font-bold">
                            Admin Panel
                        </Link>
                    )}
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="text-xl text-shadow shadow-white  font-bold">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="text-xl text-shadow shadow-white  font-bold">
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="text-xl text-shadow shadow-white  font-bold">
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="text-xl font-bold bg-white text-black  py-2 px-4 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isMenuOpen ? (
                            ""
                        ) : (
                            <FaBars className="text-2xl text-grey" />
                        )}
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-20 md:hidden">
                    <div className="flex flex-col h-full justify-center items-center space-y-6">
                        <Link
                            to="/"
                            className="text-xl text-white font-bold"
                            onClick={toggleMenu}
                        >
                            Home
                        </Link>
                        <Link
                            to="/cars"
                            className="text-xl text-white font-bold"
                            onClick={toggleMenu}
                        >
                            Cars
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="text-xl text-white font-bold"
                                    onClick={toggleMenu}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        toggleMenu();
                                    }}
                                    className="text-xl text-white font-bold"
                                >
                                    Sign out
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/signin"
                                    className="text-xl text-white font-bold"
                                    onClick={toggleMenu}
                                >
                                    Sign in
                                </Link>
                                <Link
                                    to="/register"
                                    className="text-xl font-bold bg-white text-black py-2 px-4 rounded"
                                    onClick={toggleMenu}
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <button onClick={toggleMenu} className="text-xl text-white font-bold">
                            <FaTimes className="text-2xl text-white" />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
