import React, { ChangeEvent, useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';



const Register = () => {
    const navigate = useNavigate();


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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created:', data);
                // Redirect or show a success message
                // For example, you can redirect to the login page or home page
                navigate('/');
            } else {
                const error = await response.json();
                console.error('Error creating user:', error);
                // Display an error message to the user
            }
        } catch (error) {
            console.error('Error creating user:', error);
            // Display an error message to the user
        }
    };


    return (
        <div className="container mx-auto mt-20 my-8">
            <h2 className="text-3xl text-center mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
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
    );
};

export default Register;