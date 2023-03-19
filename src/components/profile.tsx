import React, { useEffect, useState } from 'react';

interface UserData {
    first_name?: string;
    last_name?: string;
    email?: string;
    phonenumber?: string;
}

const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // Replace this with a call to your API to fetch user data
        const fetchUserData = async () => {
            const userToken = localStorage.getItem('userToken');
            if (!userToken) return;

            // Fetch user data from your API
            // For example, you can make a GET request to '/api/users/me'
            const response = await fetch('http://localhost:3001/api/user', {
                headers: {
                    'x-auth-token': userToken,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='mt-20'>
            <h2>{userData.first_name} {userData.last_name}</h2>
            <p>Email: {userData.email}</p>
            <p>Phone Number: {userData.phonenumber}</p>
        </div>
    );
};

export default Profile;
