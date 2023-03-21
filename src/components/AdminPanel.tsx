import React, { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import AddCarForm from "./AddCarForm";
import UpdateCarForm from './UpdateCarForm';
import CarTable from './CarTable';
import UserList from "./UserList";
import ReservationList from "./Reservationlist";
import Footer from './Footer';

export interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    description: string;
    price: string,
    imageUrl: string;
}

const AdminPanel: React.FC = () => {
    const [cars, setCars] = useState<Car[]>([]);
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    //selected car for update
    const [selectedCar, setSelectedCar] = useState<Car | null>(null);
    const [showAddCarForm, setShowAddCarForm] = useState(false);
    const [reservations, setReservations] = useState([]);


    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/cars");
            setCars(response.data);

        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const updateCar = async (car: Car) => {
        console.log(car)
        try {
            await axios.put(`http://localhost:3001/api/cars/${car.id}`, { make, model, year, description, price });
            fetchCars();
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    const deleteCar = async (carId: string) => {
        if (window.confirm(`Are you sure you want to the car?`)) {
            try {
                await axios.delete(`http://localhost:3001/api/cars/${carId}`);
                console.log(carId + ' deleted')
                fetchCars();
            } catch (error) {
                console.error("Error deleting car:", error);
            }
        }
    };

    const selectCar = (car: Car) => {
        setSelectedCar(car);
        setMake(car.make);
        setModel(car.model);
        setYear(car.year.toString());
        setDescription(car.description);
        setPrice(car.price);
    };



    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();
        if (selectedCar) {
            await updateCar({ ...selectedCar, make, model, year: parseInt(year), description, price });
            setSelectedCar(null);
            setMake("");
            setModel("");
            setYear("");
            setDescription("");
            setPrice("");
        }
    };

    const handleCarAdded = () => {
        setShowAddCarForm(false);
        fetchCars();
    };
    const handleCancel = () => {
        setSelectedCar(null);
        setMake("");
        setModel("");
        setYear("");
        setDescription("");
        setPrice("");
    };



    const fetchReservations = async () => {
        const response = await fetch(`http://localhost:3001/api/reservations`);

        console.log("Reservations response:", response);

        if (response.ok) {
            const data = await response.json();
            console.log("Reservations data:", data);
            setReservations(data);
        }
    };


    useEffect(() => {
        fetchCars();
        fetchReservations();
    }, []);


    return (
        <div>

            <div className="min-h-screen bg-gray-800 text-white">
                <h1 className="text-4xl font-bold py-8 text-center">Admin Panel</h1>

                <div className="flex justify-center">
                    {showAddCarForm && <AddCarForm onCarAdded={handleCarAdded} />}

                </div>

                <div className="mt-8" >
                    <div className="flex flex-col">

                        <h2 className="text-2xl font-bold text-center">Rental Cars</h2>
                        <button
                            className="bg-blue-500 w-40 hover:bg-blue-700 text-white font-bold py-2  self-center px-4 rounded focus:outline-none focus:shadow-outline "
                            onClick={() => setShowAddCarForm(!showAddCarForm)}
                        >
                            {showAddCarForm ? ' Cancel' : 'Add a new Car'}
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <CarTable cars={cars} selectCar={selectCar} deleteCar={deleteCar} />

                    </div>
                </div >
                {selectedCar && (
                    <UpdateCarForm
                        make={make}
                        model={model}
                        year={year}
                        description={description}
                        price={price}
                        onMakeChange={setMake}
                        onModelChange={setModel}
                        onYearChange={setYear}
                        onDescriptionChange={setDescription}
                        onPriceChange={setPrice}
                        onUpdateCar={handleUpdate}
                        onCancel={handleCancel}
                    />
                )}

                <h1 className="text-2xl font-bold m-10 text-center"> users:</h1>
                <UserList />
                <h2 className="text-2xl font-bold m-10 text-center"> customer Reservations:</h2>
                <ReservationList reservations={reservations} />

            </div >
            <Footer />
        </div>
    );
};

export default AdminPanel;