import React, { useState, useEffect, FormEvent, useCallback } from "react";
import axios from "axios";
import AddCarForm from "./AddCarForm";


interface Car {
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
        fetchCars();
    };







    return (
        <div className="min-h-screen bg-gray-800 text-white">
            <h1 className="text-4xl font-bold py-8 text-center">Admin Panel</h1>
            <div className="flex justify-center">
                <AddCarForm onCarAdded={handleCarAdded} />
            </div>

            <div className="mt-8" >
                <h2 className="text-2xl font-bold mb-4 text-center">Car List</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-center table-auto">
                        <thead>
                            <tr className="bg-gray-700 text-gray-300">
                                <th className="px-4 py-2">Make</th>
                                <th className="px-4 py-2">Model</th>
                                <th className="px-4 py-2">Year</th>
                                <th className="px-4 py-2">Description</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Actions</th>
                                <th className="px-4 py-2">img</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car) => (



                                <tr className="bg-gray-600 text-gray-300" key={car.id}>
                                    <td className="border px-4 py-2">{car.make}</td>
                                    <td className="border px-4 py-2">{car.model}</td>
                                    <td className="border px-4 py-2">{car.year}</td>
                                    <td className="border px-4 py-2">{car.description}</td>
                                    <td className="border px-4 py-2">{car.price}</td>

                                    <td className="border px-4 py-2">
                                        {/* Add buttons for update and delete actions */}
                                        <button
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                            onClick={() => selectCar(car)}
                                        >
                                            Update
                                        </button>

                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                                            onClick={() => deleteCar(car.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2">
                                        {car.imageUrl ? (
                                            <img className=" w-1/4 h-1/4" src={`http://localhost:3001${car.imageUrl}`} alt={`${make} ${model}`} />

                                        ) : (
                                            <td className="border px-4 py-2">No image</td>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div >
            {selectedCar && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Update Car Information
                    </h2>
                    <form className="w-full max-w-md" onSubmit={handleUpdate}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="edit-make"
                                >
                                    Make
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                                    id="edit-make"
                                    type="text"
                                    value={make}
                                    onChange={(e) => setMake(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="edit-model"
                                >
                                    Model
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                                    id="edit-model"
                                    type="text"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="edit-year"
                                >
                                    Year
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                                    id="edit-year"
                                    type="number"
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="edit-year"
                                >
                                    Description
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                                    id="edit-description"
                                    type="text"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    htmlFor="edit-year"
                                >
                                    Price
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                                    id="edit-price"
                                    type="text"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Update Car
                        </button>
                    </form>
                </div>
            )}
        </div >
    );
};

export default AdminPanel;