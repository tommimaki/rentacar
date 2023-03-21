import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../context/authContext';

interface Reservation {
    car?: string;
    carMake?: string;
    carModel?: string;
    startDate?: string;
    endDate?: string;
    totalPrice?: number;
    id?: string;
    userId?: string;
}

interface EditReservationFormProps {
    reservation?: Reservation;
    closeEditModal: () => void;
}


function EditReservationForm({ reservation, closeEditModal }: EditReservationFormProps) {
    const { userId } = useContext(AuthContext);
    console.log(userId)
    const [updatedReservation, setUpdatedReservation] = useState<Reservation>({
        car: reservation?.car || "",
        carMake: reservation?.carMake || "",
        carModel: reservation?.carModel || "",
        startDate: reservation?.startDate || "",
        endDate: reservation?.endDate || "",
        totalPrice: reservation?.totalPrice || 0,
        id: reservation?.id || "",
        userId: userId || "",
    });

    const calculateDateDifference = (startDate?: string, endDate?: string) => {
        if (!startDate || !endDate) return 0;

        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInMilliseconds = end.getTime() - start.getTime();
        const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
        return diffInDays;
    };

    const dateDifference = calculateDateDifference(
        reservation?.startDate,
        reservation?.endDate
    );

    const pricePerDay = dateDifference > 0 ? (reservation?.totalPrice || 0) / dateDifference : 50;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newReservation = {
            ...updatedReservation,
            [event.target.name]: event.target.value,
        };

        if (event.target.name === "startDate" || event.target.name === "endDate") {
            const newDiffInDays = calculateDateDifference(
                newReservation.startDate,
                newReservation.endDate
            );
            newReservation.totalPrice = newDiffInDays * pricePerDay;
        }

        setUpdatedReservation(newReservation);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/reservations/${updatedReservation.id}`, updatedReservation);

            window.location.reload();
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="mb-4">
                <label htmlFor="startDate" className="block mb-2 text-black">Start Date:</label>
                <input type="date" id="startDate" name="startDate" value={updatedReservation.startDate} onChange={handleChange} className="border border-gray-300  text-black p-2 rounded w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="startDate" className="block text-black mb-2">End Date:</label>
                <input type="date" min={updatedReservation.startDate} id="endDate" name="endDate" value={updatedReservation.endDate} onChange={handleChange} className="border border-gray-300 text-black p-2 rounded w-full" />
            </div>
            <div className="flex flex-row justify-end">
                <button type="button" onClick={closeEditModal} className="focus:outline-none text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50 px-4 py-1 rounded mr-2">Cancel</button>
                <button type="submit" className="focus:outline-none text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 focus:ring-opacity-50 px-4 py-1 rounded">Save</button>
            </div>
        </form>
    );
}

export default EditReservationForm;
