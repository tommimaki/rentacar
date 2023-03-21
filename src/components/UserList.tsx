import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm';


interface User {
    id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phonenumber?: string;
    isAdmin?: boolean;
}


const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [showEditForm, setShowEditForm] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://carback.fly.dev/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const updateAdminStatus = async (user: User) => {
        const updatedUser = { ...user, isAdmin: !user.isAdmin };
        try {
            const response = await axios.put(
                `https://carback.fly.dev/api/users/${user.id}`,
                updatedUser
            );
            if (response.status === 200) {
                setUsers((prevState) =>
                    prevState.map((u) => (u.id === user.id ? updatedUser : u))
                );
            }
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleUserUpdated = (updatedUser: User) => {
        setUsers((prevState) =>
            prevState.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );
    };

    const deleteUser = async (user: User) => {
        if (window.confirm(`Are you sure you want to remove user with email ${user.email}`)) {
            try {
                const response = await axios.delete(
                    `https://carback.fly.dev/api/users/${user.id}`
                );
                if (response.status === 200) {
                    setUsers((prevState) =>
                        prevState.filter((u) => u.id !== user.id)
                    );
                }
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };


    return (
        <div className="overflow-x-auto">
            <table className="w-full text-center table-auto">
                <thead>
                    <tr className="bg-gray-700 text-gray-300">
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Phone Number</th>
                        <th className="px-4 py-2">User Type</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr className="bg-gray-600 text-gray-300" key={user.id}>
                            <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
                            <td className="border px-4 py-2">{user.email}</td>
                            <td className="border px-4 py-2">{user.phonenumber}</td>
                            <td className="border px-4 py-2">{user.isAdmin ? "ADMIN" : "customer"}</td>
                            <td className="border px-4 py-2">
                                <button className="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { setEditUser(user); setShowEditForm(true); }}>Edit</button>
                                <button className="mx-1 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={() => updateAdminStatus(user)}>{user.isAdmin ? "Remove Admin" : "Make Admin"}</button>
                                <button className="mx-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => deleteUser(user)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showEditForm && editUser && (
                <EditUserForm user={editUser} closeForm={() => setShowEditForm(false)} onUserUpdated={handleUserUpdated} />
            )}

        </div>
    );

};

export default UserList;
