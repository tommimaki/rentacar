import React, { useState, ChangeEvent, useContext, FormEvent } from 'react';
import Footer from './Footer';
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface DecodedToken {
    isAdmin: boolean;
    id: string
}



const SignIn = () => {

    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch("https://carback.fly.dev/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if (response.ok) {
                const { token } = data;
                const decodedToken = jwtDecode(token) as DecodedToken;
                const isAdmin = decodedToken.isAdmin !== undefined ? decodedToken.isAdmin : false;

                sessionStorage.setItem("userToken", token);
                // SignIn.tsx
                sessionStorage.setItem("userId", decodedToken.id);
                console.log("Stored userId:", decodedToken.id); // Add this line to check the stored userId
                navigate("/");
                setLoggedIn(true, decodedToken.isAdmin, decodedToken.id);
                console.log("User is admin:", isAdmin);
                console.log("Token:", token);
            } else {
                const error = await response.json();
                console.error("Error authenticating user:", error);
                setErrorMessage('Error signing in user. Please try again.');
                // Display an error message to the user
            }
        } catch (error) {
            console.error("Error authenticating user:", error);
            // Display an error message to the user
        }
    };

    return (
        <div>

            <div className="container h-screen mx-auto mt-20 my-8">
                <h2 className="text-2xl mb-4">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Sign In
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
