import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Reservation from './Reservation';



interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    description: string;
    price: string;
    imageUrl: string;
}

const CarDetails = () => {
    const { carId } = useParams<{ carId: string }>();
    const [car, setCar] = useState<Car | null>(null);

    useEffect(() => {
        const fetchCar = async () => {
            console.log(carId)
            try {
                const response = await axios.get(`http://localhost:3001/api/cars/${carId}`);
                setCar(response.data);
            } catch (error) {
                console.error(`Error fetching car with ID ${carId}:`, error);
            }
        };

        fetchCar();
    }, [carId]);

    if (!car) return <p>Loading...</p>;

    return (
        <div>

            <div className="p-4">
                <div className="relative">
                    <img
                        src={`http://localhost:3001${car.imageUrl}`}
                        alt={`${car.make} ${car.model}`}
                        className="h-auto mb-4 object-cover"
                    />
                    <h1 className="absolute top-0 left-0 right-0 text-2xl lg:text-6xl font-bold px-4 py-2 bg-gray-900 text-center text-white opacity-90">
                        {`${car.make} ${car.model}`}
                    </h1>
                </div>
                <h2 className="text-2xl font-bold mb-2">${car.price} / päivä</h2>
                <p>{car.description}</p>
            </div>
            <Reservation />
        </div>
    );
};

export default CarDetails;
