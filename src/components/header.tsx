// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../context/authContext';


// const Header = () => {
//     const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

//     const handleLogout = () => {
//         localStorage.removeItem('userToken');
//         setLoggedIn(false);
//     };

//     return (
//         <header className="fixed top-0 left-0 right-0 bg-transparent z-10">
//             <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//                 <div className="flex items-center space-x-4">
//                     <Link to="/" className="text-xl font-bold ">
//                         Home
//                     </Link>
//                     <Link to="/cars" className="text-xl font-bold ">
//                         Cars
//                     </Link>
//                 </div>
//                 <div className="flex items-center space-x-4">
//                     {isLoggedIn ? (
//                         <>
//                             <Link to="/profile" className="text-xl font-bold">
//                                 Profile
//                             </Link>
//                             <button onClick={handleLogout} className="text-xl font-bold">
//                                 Sign out
//                             </button>
//                         </>
//                     ) : (
//                         <>
//                             <Link to="/signin" className="text-xl font-bold ">
//                                 Sign in
//                             </Link>
//                             <Link
//                                 to="/register"
//                                 className="text-xl font-bold bg-white text-black py-2 px-4 rounded"
//                             >
//                                 Register
//                             </Link>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </header>
//     );
// };

// export default Header;
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Header = () => {
    const { isLoggedIn, setLoggedIn, isAdmin } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        setLoggedIn(false, false);
    };


    return (
        <header className="fixed top-0 left-0 right-0 bg-transparent z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <Link to="/" className="text-xl font-bold">
                        Home
                    </Link>
                    <Link to="/cars" className="text-xl font-bold">
                        Cars
                    </Link>
                    {isAdmin && (
                        <Link to="/Adminpanel" className="text-xl font-bold">
                            Admin Panel
                        </Link>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="text-xl font-bold">
                                Profile
                            </Link>
                            <button onClick={handleLogout} className="text-xl font-bold">
                                Sign out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="text-xl font-bold">
                                Sign in
                            </Link>
                            <Link
                                to="/register"
                                className="text-xl font-bold bg-white text-black py-2 px-4 rounded"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
