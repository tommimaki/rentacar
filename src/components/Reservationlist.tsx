import { useState, useEffect } from "react";
import axios from 'axios';
import EditReservationForm from './EditReservationForm';



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
    const [editingReservation, setEditingReservation] = useState<Reservation | null>(null);

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

    const editReservation = (reservation: Reservation) => {
        setEditingReservation(reservation);
    };

    const closeEditModal = () => {
        setEditingReservation(null);
    };

    useEffect(() => {
        setDisplayReservations(reservations);
    }, [reservations]);

    return (

        <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg">
            {Array.isArray(displayReservations) ? (
                <div className="grid  grid-cols-2 lg:grid-cols-4  gap-10">
                    {/* <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-${displayReservations.length > 1 ? '4' : '2'} gap-x-8 gap-y-4 grid-auto-rows-auto`} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(0, 1fr))' }}> */}
                    {displayReservations.map((reservation: unknown, index: number) => {
                        if (typeof reservation === "object" && reservation !== null) {
                            const { carMake, carModel, startDate, endDate, totalPrice, id } = reservation as Reservation;
                            const formattedStartDate = new Date(startDate).toISOString().slice(0, 10);
                            const formattedEndDate = new Date(endDate).toISOString().slice(0, 10);

                            return (
                                <div key={index} className="border-b border-r border-gray-600 p-5">
                                    <h3 className="text-xl font-bold mb-2">Reservation {index + 1}</h3>
                                    <p className="mb-2">Car Make: {carMake}</p>
                                    <p className="mb-2">Car model: {carModel}</p>
                                    <p className="mb-2">Start Date: {formattedStartDate}</p>
                                    <p className="mb-2">End Date: {formattedEndDate}</p>
                                    <p className="mb-2">Total Price: {`${totalPrice}€`}</p>
                                    <div className="flex flex-row justify-end">
                                        <button className="focus:outline-none text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:

ring-yellow-300 focus:ring-opacity-50 px-4 py-1 rounded mr-2" onClick={() => editReservation(reservation as Reservation)}>Edit</button>
                                        <button className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 px-4 py-1 rounded" onClick={() => deleteReservation(id, carMake, carModel)}>Cancel</button>
                                    </div>
                                </div>
                            );
                        }
                        return null;
                    })}
                </div>
            ) : (
                <div className="text-center">
                    <p>No reservations found.</p>
                </div>
            )}
            {editingReservation && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                        {editingReservation && (
                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                                    <EditReservationForm
                                        reservation={editingReservation as Reservation}
                                        closeEditModal={closeEditModal}
                                    />
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            )}
        </div>
    );
}

export default ReservationList;