import React, { useState, useEffect, FormEvent, useCallback } from "react";
import axios from "axios";
import AddCarForm from "./AddCarForm";
import UpdateCarForm from './UpdateCarForm';
import CarTable from './CarTable';




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

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/cars");
            setCars(response.data);
            cars.forEach(car => {
                console.log(car);
            });
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
        try {
            await axios.delete(`http://localhost:3001/api/cars/${carId}`);
            console.log(carId + ' deleted')
            fetchCars();
        } catch (error) {
            console.error("Error deleting car:", error);
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




    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-bold py-8 text-center">Admin Panel</h1>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-auto mb-4"
                onClick={() => setShowAddCarForm(!showAddCarForm)}
            >
                {showAddCarForm ? ' Cancel' : 'Add a new Car'}
            </button>

            <div className="flex justify-center">
                {showAddCarForm && <AddCarForm onCarAdded={handleCarAdded} />}

            </div>

            <div className="mt-8" >
                <h2 className="text-2xl font-bold mb-4 text-center">Cars we rent</h2>
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

        </div >
    );
};

export default AdminPanel;