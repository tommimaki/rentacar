import { useState, useEffect } from "react";

interface Reservation {
    car: string;
    startDate: string;
    endDate: string;
    totalPrice: number;
}

interface ReservationListProps {
    reservations: Reservation[];
}

function ReservationList({ reservations }: ReservationListProps) {
    const [displayReservations, setDisplayReservations] = useState<Reservation[]>([]);

    useEffect(() => {
        setDisplayReservations(reservations);
    }, [reservations]);

    return (
        <div className="bg-gray-800 text-white p-6 rounded-md shadow-lg">
            {Array.isArray(displayReservations) ? (
                displayReservations.map((reservation: unknown, index: number) => {
                    if (typeof reservation === "object" && reservation !== null) {
                        const { car, startDate, endDate, totalPrice } = reservation as Reservation;

                        return (
                            <div key={index} className="border-b border-gray-600 pb-4 mb-4">
                                <h3 className="text-xl font-bold mb-2">Reservation {index + 1}</h3>
                                <p>Car ID: {car}</p>
                                <p>Start Date: {startDate}</p>
                                <p>End Date: {endDate}</p>
                                <p>Total Price: {totalPrice}</p>
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
