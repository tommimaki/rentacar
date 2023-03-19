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

    // const cars = [
    //     {
    //         id: 1,
    //         name: 'Ferrari F8 Spider',
    //         image: car1,
    //         price: 1499,
    //         description: 'Experience the thrill of driving the ultimate Italian supercar with the Ferrari F8 Spider. With its powerful V8 engine and sleek design, this convertible sports car is the perfect choice for a luxurious road trip.',
    //     },
    //     {
    //         id: 2,
    //         name: 'Lamborghini Huracan',
    //         image: car2,
    //         price: 1999,
    //         description: 'Take the wheel of the iconic Lamborghini Huracan and experience the power and speed of this legendary Italian supercar. With its aerodynamic design and powerful V10 engine, this car is sure to turn heads wherever you go.',
    //     },
    //     {
    //         id: 3,
    //         name: 'Porsche 911 Turbo S',
    //         image: car3,
    //         price: 1299,
    //         description: 'Drive the Porsche 911 Turbo S and experience the ultimate in German engineering and precision. With its powerful turbocharged engine and advanced technology, this car is perfect for a thrilling and comfortable road trip.',
    //     },
    //     {
    //         id: 4,
    //         name: 'Bentley Continental GT',
    //         image: car4,
    //         price: 2199,
    //         description: 'Experience the pinnacle of British luxury and performance with the Bentley Continental GT. With its handcrafted interior and powerful W12 engine, this car is perfect for a grand tour or a luxurious weekend getaway.'
    //     }
    // ];

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


        <div className="h-screen px-4 py-12 md:px-12 md:py-24 bg-gray-100 shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Autot</h2>
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {cars.map((car) => (
                        <Link key={car.id} to={`/cars/${car.id}`} className="block hover:shadow-lg transition duration-300">
                            <div className="relative">
                                <img src={`http://localhost:3001${car.imageUrl}`} alt={car.make} className="object-cover w-full h-64  rounded-t-lg" />
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
