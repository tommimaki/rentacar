import React, { ChangeEvent, useState, FormEvent, useContext } from 'react';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import jwtDecode from "jwt-decode";

interface DecodedToken {
    isAdmin: boolean;
    id: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const { setLoggedIn } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phonenumber: '',
        password: ''
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };


    //register user and sign in if succesfull
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('https://carback.fly.dev/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);

                // Log in the user
                const signInResponse = await fetch('https://carback.fly.dev/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: formData.email,
                        password: formData.password
                    })
                });

                if (signInResponse.ok) {
                    const signInData = await signInResponse.json();
                    console.log('User signed in:', signInData);

                    // Save the user's credentials in the sessionStorage
                    sessionStorage.setItem('userToken', signInData.token);
                    sessionStorage.setItem('userId', signInData.userId);

                    // Update the context state
                    const decodedToken = jwtDecode(signInData.token) as DecodedToken;
                    const isAdmin = decodedToken.isAdmin !== undefined ? decodedToken.isAdmin : false;
                    setLoggedIn(true, isAdmin, decodedToken.id);

                    navigate('/');
                } else {
                    const error = await signInResponse.json();
                    console.error('Error signing in user:', error);
                    setErrorMessage('Error signing in user. Please try again.');
                }
            } else {
                const error = await response.json();
                console.error('Error creating user:', error);
                setErrorMessage('Error creating user. Please check your input and try again.');
            }
        } catch (error) {
            console.error('Error creating user:', error);
            setErrorMessage('Error creating user. Please check your input and try again.');
        }
    };

    return (
        <div>

            <div className="container h-screen mx-auto mt-20 my-8">
                <h2 className="text-3xl text-center mb-4">Register</h2>
                <form onSubmit={handleSubmit}>
                    {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block mb-1">First Name</label>
                        <input type="text" name="first_name" id="first_name" value={formData.first_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block mb-1">Last Name</label>
                        <input type="text" name="last_name" id="last_name" value={formData.last_name} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phonenumber" className="block mb-1">Phone Number</label>
                        <input type="text" name="phonenumber" id="phonenumber" value={formData.phonenumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Register
                    </button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
