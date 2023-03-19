import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';


interface ReservationProps {
    userId: string;
}

function Reservation({ carId }: { carId: string }) {
    const { userId } = useContext(AuthContext);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        try {
            console.log(userId)
            const response = await axios.post(`http://localhost:3001/api/reservations`, {
                user: userId,
                car: carId,
                startDate,
                endDate,
                totalPrice,
            });
            console.log('Reservation created:', response.data);
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-2xl text-white font-bold mb-4">Create Reservation</h2>


            <div className="flex flex-col mb-4">
                <label htmlFor="start-date" className="text-white font-bold mb-2">
                    Start Date:
                </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-gray-800 rounded-lg py-2 px-3 text-white"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="end-date" className="text-white font-bold mb-2">
                    End Date:
                </label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-gray-800 rounded-lg py-2 px-3 text-white"
                />
            </div>
            <div className="flex flex-col mb-4">
                <label htmlFor="total-price" className="text-white font-bold mb-2">
                    Total Price:
                </label>
                <input
                    type="number"
                    id="total-price"
                    value={totalPrice}
                    onChange={(e) => setTotalPrice(e.target.value)}
                    className="bg-gray-800 rounded-lg py-2 px-3 text-white"
                />
            </div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                Create Reservation
            </button>
        </form>
    );
}

export default Reservation;
