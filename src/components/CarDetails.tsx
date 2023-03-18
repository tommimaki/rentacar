// // src/components/CarDetails.js
// import React from 'react';





// const cars = [
//     // Move the cars array from the Cars component to the CarDetails component
//     // so that you can access it here
// ];

// const CarDetails = () => {
//     const { carId } = useParams();
//     const [car, setCar] = useState(null);

//     useEffect(() => {
//         const selectedCar = cars.find((car) => car.id === parseInt(carId));
//         setCar(selectedCar);
//     }, [carId]);

//     if (!car) return <p>Loading...</p>;

//     return (
//         <div className="p-4">
//             <h1 className="text-4xl font-bold mb-4">{car.name}</h1>
//             <img src={car.image} alt={car.name} className="w-full h-auto mb-4" />
//             <h2 className="text-2xl font-bold mb-2">${car.price} / päivä</h2>
//             <p>{car.description}</p>
//         </div>
//     );
// };

// export default CarDetails;
import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2rs.jpg';
import car3 from '../assets/car3rs.jpg';
import car4 from '../assets/car4rs.jpg';

const cars = [
    {
        id: 1,
        name: 'Ferrari F8 Spider',
        image: car1,
        price: 1499,
        description: 'Experience the thrill of driving the ultimate Italian supercar with the Ferrari F8 Spider. With its powerful V8 engine and sleek design, this convertible sports car is the perfect choice for a luxurious road trip.',
    },
    {
        id: 2,
        name: 'Lamborghini Huracan',
        image: car2,
        price: 1999,
        description: 'Take the wheel of the iconic Lamborghini Huracan and experience the power and speed of this legendary Italian supercar. With its aerodynamic design and powerful V10 engine, this car is sure to turn heads wherever you go.',
    },
    {
        id: 3,
        name: 'Porsche 911 Turbo S',
        image: car3,
        price: 1299,
        description: 'Drive the Porsche 911 Turbo S and experience the ultimate in German engineering and precision. With its powerful turbocharged engine and advanced technology, this car is perfect for a thrilling and comfortable road trip.',
    },
    {
        id: 4,
        name: 'Bentley Continental GT',
        image: car4,
        price: 2199,
        description: 'Experience the pinnacle of British luxury and performance with the Bentley Continental GT. With its handcrafted interior and powerful W12 engine, this car is perfect for a grand tour or a luxurious weekend getaway.'
    }

];

const CarDetails = () => {
    const { carId } = useParams<{ carId: string }>();
    const [car, setCar] = useState<{ id: number; name: string; image: string; price: number; description: string; } | null>(null);

    useEffect(() => {
        const selectedCar = cars.find((car) => car.id === parseInt(carId || '0'));
        setCar(selectedCar || null);
    }, [carId]);

    if (!car) return <p>Loading...</p>;
    return (
        <div className="p-4">

            <div className="relative">
                <img src={car.image} alt={car.name} className=" h-auto mb-4  object-cover" />
                <h1 className="absolute top-0 left-0 right-0 text-2xl lg:text-6xl font-bold px-4 py-2 bg-gray-900 text-center text-white opacity-90">{car.name}</h1>

            </div>
            <h2 className="text-2xl font-bold mb-2">${car.price} / päivä</h2>
            <p>{car.description}</p>
        </div>
    );

};

export default CarDetails;
