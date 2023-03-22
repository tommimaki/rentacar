import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

interface ReservationProps {
    carId: string;
    carMake: string;
    carModel: string;
    pricePerDay: number;
    onReservationSuccess: () => void;
}

function Reservation({ carId, pricePerDay, onReservationSuccess, carMake, carModel }: ReservationProps) {
    const { userId } = useContext(AuthContext);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalPrice, setTotalPrice] = useState('');
    const [reservations, setReservations] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`https://carback.fly.dev/api/reservations/car/${carId}`);
                if (response.status === 200) {
                    setReservations(response.data);
                } else {
                    console.error('Error fetching reservations:', response.data);
                }
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };
        fetchReservations();
    }, [carId]);


    const hasConflictingReservation = () => {
        const newStart = new Date(startDate);
        const newEnd = new Date(endDate);

        return reservations.some((reservation: any) => {
            const existingStart = new Date(reservation.startDate);
            const existingEnd = new Date(reservation.endDate);

            return (newStart >= existingStart && newStart < existingEnd) || (newEnd > existingStart && newEnd <= existingEnd) || (newStart <= existingStart && newEnd >= existingEnd);
        });
    };

    const calculateTotalPrice = (start: string, end: string) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const days = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
            return days * pricePerDay;
        }
        return 0;
    };

    // Update the total price whenever start or end date changes
    useEffect(() => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (start <= end) {
                const daysDifference = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                setTotalPrice((daysDifference * pricePerDay).toString());
            } else {
                setTotalPrice('');
            }
        }
        setTotalPrice(calculateTotalPrice(startDate, endDate).toString());

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startDate, endDate, pricePerDay]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        if (!userId) {
            setErrorMessage('You must be logged in to rent a car.');
            return;
        }
        if (hasConflictingReservation()) {
            alert('The selected dates are already booked. Please choose different dates.');
            return;
        }

        try {
            console.log(userId)
            const response = await axios.post(`http://localhost:3001/api/reservations`, {
                user: userId,
                carId: carId,
                carMake: carMake,
                carModel: carModel,
                startDate,
                endDate,
                totalPrice,
            });
            onReservationSuccess();
            console.log('Reservation created:', response.data);
            // Display dialog to notify customer of reservation and how to access it
            window.alert('Your reservation has been made! You can view your reservation details in your user profile.');
            setStartDate('');
            setEndDate('');
            setTotalPrice('');
        } catch (error) {
            console.error('Error creating reservation:', error);
        }
    };


    return (
        <div>
            {errorMessage && (
                <div className="bg-red-500 text-white p-3 rounded-md mb-4">
                    {errorMessage}
                </div>
            )}
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
                        min={new Date().toISOString().slice(0, 10)}
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
                        min={startDate}
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="bg-gray-800 rounded-lg py-2 px-3 text-white"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="total-price" className="text-white font-bold mb-2">
                        <h3>  Total Price:  {totalPrice} € </h3>
                    </label>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                    Create Reservation
                </button>
            </form>

        </div>
    );
}

export default Reservation;
