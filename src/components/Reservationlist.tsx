import { useState, useEffect } from "react";
import axios from 'axios';


interface Reservation {
    car: string;
    carMake: string;
    carModel: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
    id: string;
}

interface ReservationListProps {
    reservations: Reservation[];
}

// const updateReservation = async (reservation: Reservation) => {
//     console.log(reservation)
//     try {
//         await axios.put(`http://localhost:3001/api/reservations/${reservation.id}`, { car, startDate, endDate, totalPrice, id });
//     } catch (error) {
//         console.error("Error updating reservation:", error);
//     }
// };


function ReservationList({ reservations }: ReservationListProps) {
    const [displayReservations, setDisplayReservations] = useState<Reservation[]>([]);

    const deleteReservation = async (id: string) => {
        try {
            await axios.delete(`http://localhost:3001/api/reservations/${id}`);
            console.log(id + ' deleted')
            // fetchCars();
        } catch (error) {
            console.error("Error deleting reservation:", error);
        }
    };

    useEffect(() => {
        setDisplayReservations(reservations);
    }, [reservations]);

    return (
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg">
            {Array.isArray(displayReservations) ? (
                displayReservations.map((reservation: unknown, index: number) => {
                    if (typeof reservation === "object" && reservation !== null) {
                        const { car, carMake, carModel, startDate, endDate, totalPrice, id } = reservation as Reservation;

                        return (
                            <div key={index} className="border-b border-gray-600 pb-4 mb-4">
                                <h3 className="text-xl font-bold mb-2">Reservation {index + 1}</h3>
                                {/* <p>Car ID: {car}</p> */}
                                <p>Car Make: {carMake}</p>
                                <p>Car model: {carModel}</p>
                                <p>Start Date: {startDate}</p>
                                <p>End Date: {endDate}</p>
                                <p>Total Price: {totalPrice}</p>
                                <button className="text-red" onClick={() => deleteReservation(id)}>  delete </button>

                            </div>
                        );
                    }

                    return null;
                })
            ) : (
                <p>Loading reservations...</p>
            )}
        </div>
    );
}

export default ReservationList;
