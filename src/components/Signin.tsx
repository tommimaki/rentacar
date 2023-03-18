import React, { useState, ChangeEvent, useContext, FormEvent } from 'react';
import jwtDecode from "jwt-decode";

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

interface DecodedToken {
    isAdmin: boolean;
    // Add any other properties from your decoded token here
}


const SignIn = () => {

    const navigate = useNavigate();
    const { isLoggedIn, setLoggedIn } = useContext(AuthContext);

    const storeToken = (token: string) => {
        localStorage.setItem('userToken', token);
    };


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
            const response = await fetch("http://localhost:3001/api/auth", {
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
                navigate("/");
                setLoggedIn(true, isAdmin);
                console.log("User is admin:", isAdmin);
                console.log("Token:", token);
            } else {
                const error = await response.json();
                console.error("Error authenticating user:", error);

                // Display an error message to the user
            }
        } catch (error) {
            console.error("Error authenticating user:", error);

            // Display an error message to the user
        }
    };

    return (
        <div className="container mx-auto mt-20 my-8">
            <h2 className="text-2xl mb-4">Sign In</h2>
            <form onSubmit={handleSubmit}>
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
    );
};

export default SignIn;
