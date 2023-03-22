import React, { useState } from 'react';
import { Car } from './AdminPanel';




interface CarTableProps {
    cars: Car[];
    selectCar: (car: Car) => void;
    deleteCar: (id: string) => void;
}

const CarTable: React.FC<CarTableProps> = ({ cars, selectCar, deleteCar }) => {
    // show more details button/function setup    
    const [showMoreMap, setShowMoreMap] = useState<{ [id: string]: boolean }>({});

    const toggleShowMore = (id: string) => {
        setShowMoreMap(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
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
                            <td className="border text-xs px-4 py-2">
                                <div className="text" key={car.id}>
                                    {showMoreMap[car.id] ? car.description : `${car.description.substring(0, 50)}...`}
                                    <button
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-2"
                                        onClick={() => toggleShowMore(car.id)}
                                    >
                                        {showMoreMap[car.id] ? "show less" : "read more"}
                                    </button>
                                </div>
                            </td>
                            <td className="border px-4 py-2">{car.price}</td>
                            <td className="border px-4 py-2">
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
                                    <img className=" w-1/4 h-1/4" src={`https://carback.fly.dev${car.imageUrl}`} alt={`${car.make} ${car.model}`} />
                                ) : (
                                    <td className="border px-4 py-2">No image</td>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CarTable;
