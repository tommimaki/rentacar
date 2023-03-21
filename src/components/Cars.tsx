import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer'

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
            const response = await axios.get("https://carback.fly.dev/api/cars");
            setCars(response.data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };


    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <div className=" px-4 py-12 md:px-12  min-h-screen   md:py-24 bg-gray-100">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Autot</h2>
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                        {cars.map((car) => (
                            <Link key={car.id} to={`/cars/${car.id}`} className="block hover:shadow-lg transition duration-300">
                                <div className="relative">
                                    <img src={`https://carback.fly.dev${car.imageUrl}`} alt={car.make} className="object-cover w-full h-64 rounded-t-lg" />
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
            <Footer />
        </div>
    );
};

export default Cars;
