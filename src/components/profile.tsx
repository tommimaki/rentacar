import React, { useEffect, useState, useContext } from "react";
import ReservationList from './Reservationlist';
import { AuthContext } from '../context/authContext';

interface UserData {
    first_name?: string;
    last_name?: string;
    email?: string;
    phonenumber?: string;
}

interface Reservation {
    car: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
}
const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reservations, setReservations] = useState([]);
    const { userId } = useContext(AuthContext);

    const fetchUserData = async () => {
        const userToken = sessionStorage.getItem("userToken");
        console.log(userToken)

        console.log(userId + ' userID')

        const response = await fetch(`http://localhost:3001/api/users/${userId}`, {

        });

        console.log("User data response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("User data:", data);
            setUserData(data);
        }
    };
    const fetchReservations = async () => {
        const response = await fetch(`http://localhost:3001/api/reservations/user/${userId}`);

        console.log("Reservations response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("Reservations data:", data);
            setReservations(data);
        }
    };


    useEffect(() => {
        fetchUserData();
        fetchReservations();
    }, [userId]);
    return (
        <div className="mt-20">
            <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg">
                <h2 className="text-2xl font-bold mb-4">
                    {userData?.first_name} {userData?.last_name}
                </h2>
                <p className="mb-2">
                    <span className="font-semibold">Email:</span> {userData?.email}
                </p>
                <p className="mb-4">
                    <span className="font-semibold">Phone Number:</span> {userData?.phonenumber}
                </p>
            </div>
            <h2 className="text-2xl text-center font-bold mt-8 mb-4">Reservations:</h2>
            <ReservationList reservations={reservations} />
        </div>
    );
};
export default Profile;
