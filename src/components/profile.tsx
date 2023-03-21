import React, { useEffect, useState, useContext } from "react";
import ReservationList from './Reservationlist';
import { AuthContext } from '../context/authContext';
import Footer from './Footer';


interface UserData {
    first_name?: string;
    last_name?: string;
    email?: string;
    phonenumber?: string;
}

interface Reservation {
    car: string;
    carMake: string;
    carModel: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    id: string;
}


const Profile = () => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const { userId } = useContext(AuthContext);
    const [showUpdateForm, setShowUpdateForm] = useState(false);


    const fetchUserData = async () => {
        const userToken = sessionStorage.getItem("userToken");
        console.log(userToken)

        console.log(userId + ' userID')

        const response = await fetch(`https://carback.fly.dev/api/users/${userId}`, {

        });

        console.log("User data response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("User data:", data);
            setUserData(data);
        }
    };

    const updateUserData = async (updatedData: UserData) => {
        try {
            const response = await fetch(`https://carback.fly.dev/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            console.log("Update user data response:", response);

            if (response.ok) {
                setUserData(updatedData);
                setShowUpdateForm(false)
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };



    const fetchReservations = async () => {
        const response = await fetch(`https://carback.fly.dev/api/reservations/user/${userId}`);

        console.log("Reservations response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("Reservations data:", data);
            setReservations(data);
        }
    };

    useEffect(() => {
        fetchUserData();

        if (userId) {
            fetchReservations();
        }
    }, [userId]);

    return (


        <div>

            <div className="mt-20 flex justify-center  min-h-screen align-center">
                {userData ? (
                    <div>
                        <div>
                            <h2 className="text- mb-4">
                                user: {userData?.first_name} {userData?.last_name}
                            </h2>
                            <h2 className=" mb-4">
                                email:  {userData?.email}
                            </h2>
                            <h2 className=" font-bold mb-4">
                                phone:   {userData?.phonenumber}
                            </h2>
                            <button
                                className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4"
                                onClick={() => setShowUpdateForm(!showUpdateForm)}
                            >
                                {showUpdateForm ? "Cancel" : "Update User Data"}
                            </button>
                        </div>
                        {showUpdateForm && (
                            <form className="mb-4">

                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold mb-2" htmlFor="first-name-input">First Name:</label>
                                    <input
                                        type="text"
                                        id="first-name-input"
                                        className="border rounded-md py-2 px-3"
                                        value={userData.first_name}
                                        onChange={(event) => setUserData({ ...userData, first_name: event.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold mb-2" htmlFor="last-name-input">Last Name:</label>
                                    <input
                                        type="text"
                                        id="last-name-input"
                                        className="border rounded-md py-2 px-3"
                                        value={userData.last_name}
                                        onChange={(event) => setUserData({ ...userData, last_name: event.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold mb-2" htmlFor="email-input">Email:</label>
                                    <input
                                        type="email"
                                        id="email-input"
                                        className="border rounded-md py-2 px-3"
                                        value={userData.email}
                                        onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                                    />
                                </div>
                                <div className="flex flex-col mb-4">
                                    <label className="font-semibold mb-2" htmlFor="phone-number-input">Phone Number:</label>
                                    <input
                                        type="tel"
                                        id="phone-number-input"
                                        className="border rounded-md py-2 px-3"
                                        value={userData.phonenumber}
                                        onChange={(event) => setUserData({ ...userData, phonenumber: event.target.value })}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                                        onClick={() => updateUserData(userData)}
                                    >
                                        Save
                                    </button>
                                </div>

                            </form>
                        )}
                        <div>

                            <h2 className="text-2xl text-center font-bold mt-8 mb-4">Reservations:</h2>
                            <ReservationList reservations={reservations} />
                        </div>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )
                }
            </div >
            <Footer />
        </div>
    );
};
export default Profile;
