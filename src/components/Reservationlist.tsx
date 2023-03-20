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



function ReservationList({ reservations }: ReservationListProps) {
    const [displayReservations, setDisplayReservations] = useState<Reservation[]>([]);

    const deleteReservation = async (id: string, carMake: string, carModel: string) => {

        if (window.confirm(`Are you sure you want to cancel your reservation for the ${carMake} ${carModel}? It's a stellar car`)) {

            try {
                await axios.delete(`http://localhost:3001/api/reservations/${id}`);
                console.log(id + ' deleted')
                const updatedReservations = displayReservations.filter((reservation) => reservation.id !== id);
                setDisplayReservations(updatedReservations);
            } catch (error) {
                console.error("Error deleting reservation:", error);
            }
        }
    };

    useEffect(() => {
        setDisplayReservations(reservations);
    }, [reservations]);


    return (
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg">


            {Array.isArray(displayReservations) ? (
                <div className="grid  grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4">
                    {displayReservations.map((reservation: unknown, index: number) => {
                        if (typeof reservation === "object" && reservation !== null) {
                            const { carMake, carModel, startDate, endDate, totalPrice, id } = reservation as Reservation;
                            const formattedStartDate = new Date(startDate).toISOString().slice(0, 10);
                            const formattedEndDate = new Date(endDate).toISOString().slice(0, 10);

                            return (
                                <div key={index} className="border-b border-r border-gray-600 pb-4 mb-4">
                                    <h3 className="text-xl font-bold mb-2">Reservation {index + 1}</h3>
                                    <p className="mb-2">Car Make: {carMake}</p>
                                    <p className="mb-2">Car model: {carModel}</p>
                                    <p className="mb-2">Start Date: {formattedStartDate}</p>
                                    <p className="mb-2">End Date: {formattedEndDate}</p>
                                    <p className="mb-2">Total Price: {`${totalPrice}€`}</p>
                                    <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 md:mb-0 md:mr-2" onClick={() => deleteReservation(id, carMake, carModel)}>Delete</button>
                                </div>
                            );
                        }

                        return null;
                    })}
                </div>
            ) : (
                <p>Loading reservations...</p>
            )}
        </div>
    );

}

export default ReservationList;
