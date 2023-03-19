// AddCarForm.tsx
import React, { useState, FormEvent, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";

interface Car {
    id: string;
    make: string;
    model: string;
    year: number;
    description: string;
    price: string;
}

interface AddCarFormProps {
    onCarAdded: () => void;
}

const AddCarForm: React.FC<AddCarFormProps> = ({ onCarAdded }) => {
    const [make, setMake] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState<File | null>(null);


    // const handleSubmit = async (e: FormEvent) => {
    //     e.preventDefault();
    //     await addCar({ make, model, year: parseInt(year), description, price });
    //     setMake("");
    //     setModel("");
    //     setYear("");
    //     setDescription("");
    //     setPrice("");
    // };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("make", make);
        formData.append("model", model);
        formData.append("year", year);
        formData.append("description", description);
        formData.append("price", price);

        await addCar(formData);
        setMake("");
        setModel("");
        setYear("");
        setDescription("");
        setPrice("");
        setImage(null); // Add this line
    };

    const addCar = async (formData: FormData) => {
        try {
            await axios.post("http://localhost:3001/api/cars", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            onCarAdded();
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };




    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        // You can restrict file types or implement custom validations here
        const file = acceptedFiles[0];
        setImage(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });




    return (
        <div className="flex justify-center">
            <form className="w-full max-w-md" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="make">
                            Make
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="make"
                            type="text"
                            value={make}
                            onChange={(e) => setMake(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="model">
                            Model
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="model"
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="year">
                            Year
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="year"
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="model">
                            Description
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="model">
                            Price
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-700 text-white border border-gray-600 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-600"
                            id="price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
                            Car Image
                        </label>
                        <div
                            {...getRootProps()}
                            className={`border-dashed border-2 p-4 text-center ${isDragActive ? "border-blue-500" : "border-gray-600"
                                }`}
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <p>Drop the image here...</p>
                            ) : (
                                <p>Drag and drop an image, or click to select a file</p>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add Car
                </button>
            </form>
        </div>
    )
};

export default AddCarForm;
