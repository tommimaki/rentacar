import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2rs.jpg';
import car3 from '../assets/car3rs.jpg';
import car4 from '../assets/car4rs.jpg';



interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    description: string;
    price: string,
    imageUrl: string;

}
const Cars = () => {

    const [cars, setCars] = useState<Car[]>([]);

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


    useEffect(() => {
        fetchCars();
    }, []);


    return (


        <div className="h-screen px-4 py-12 md:px-12 md:py-24 bg-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Autot</h2>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                    {cars.map((car) => (
                        <Link key={car.id} to={`/cars/${car.id}`} className="block hover:shadow-lg transition duration-300">
                            <div className="relative">
                                <img src={`http://localhost:3001${car.imageUrl}`} alt={car.make} className="object-cover w-full h-64 rounded-t-lg" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-900 bg-opacity-60 rounded-b-lg">
                                    <h3 className="text-white text-xl font-bold">{car.make}</h3>
                                    <p className="text-gray-400">${car.price} / päivä</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>


    );
};

export default Cars;
