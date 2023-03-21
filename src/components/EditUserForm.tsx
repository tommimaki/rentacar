import React, { useState } from 'react';
import axios from 'axios';

interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phonenumber?: string;
    isAdmin?: boolean;
}

interface EditUserFormProps {
    user: User;
    closeForm: () => void;
    onUserUpdated: (updatedUser: User) => void;
}


const EditUserForm: React.FC<EditUserFormProps> = ({ user, closeForm, onUserUpdated }) => {
    const [updatedUser, setUpdatedUser] = useState<User>(user);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ): void => {
        const { name, value } = event.target;
        setUpdatedUser((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.put(
                `https://carback.fly.dev/api/users/${updatedUser.id}`,
                updatedUser
            );
            if (response.status === 200) {
                onUserUpdated(response.data);
                closeForm();
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="bg-white rounded-lg p-4">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-bold mb-2">
                        First Name:
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        value={updatedUser.first_name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Last Name */}
                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-bold mb-2">
                        Last Name:
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        value={updatedUser.last_name}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                {/* phone */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-bold mb-2">
                        phonenumber:
                    </label>
                    <input
                        type="phonenumber"
                        name="phonenumber"
                        id="phonenumber"
                        value={updatedUser.phonenumber}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Save
                </button>
                <button
                    type="button"
                    onClick={closeForm}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                >
                    Cancel
                </button>
            </form>
        </div>
    );
};

export default EditUserForm;
