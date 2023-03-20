import React, { FormEvent } from "react";

interface UpdateCarFormProps {
    make: string;
    model: string;
    year: string;
    description: string;
    price: string;
    onMakeChange: (value: string) => void;
    onModelChange: (value: string) => void;
    onYearChange: (value: string) => void;
    onDescriptionChange: (value: string) => void;
    onPriceChange: (value: string) => void;
    onUpdateCar: (e: FormEvent) => void;
    onCancel: () => void;
}

const UpdateCarForm: React.FC<UpdateCarFormProps> = ({
    make,
    model,
    year,
    description,
    price,
    onMakeChange,
    onModelChange,
    onYearChange,
    onDescriptionChange,
    onPriceChange,
    onUpdateCar,
    onCancel
}) => {
    return (
        <div className="mt-8 flex justify-center">
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Update Car Information
                </h2>
                <form className="w-full max-w-md" onSubmit={onUpdateCar}>

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
                                onChange={(e) => onMakeChange(e.target.value)}
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
                                onChange={(e) => onModelChange(e.target.value)}
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
                                onChange={(e) => onYearChange(e.target.value)}
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
                                onChange={(e) => onDescriptionChange(e.target.value)}
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
                                onChange={(e) => onPriceChange(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update Car
                    </button>
                    <button
                        className="w-full bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => onCancel}
                    >
                        Cancel
                    </button>

                </form>
            </div>
        </div>
    );
};

export default UpdateCarForm;