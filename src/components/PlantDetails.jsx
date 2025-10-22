import React from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";

const PlantDetails = () => {
    const { id } = useParams();
    const data = useLoaderData();

    // data না থাকলে fallback
    if (!data) {
        return (
            <div className="text-center py-10">
                <span className="loading loading-dots loading-lg"></span>
                <p className="mt-2 text-gray-600">Loading plant details...</p>
            </div>
        );
    }

    const plant = data.find(item => item.plantId === parseInt(id));

    if (!plant) {
        return (
            <div className="text-center py-10 text-gray-500">
                <p className="text-xl mb-4">No plant found with this ID 😕</p>
                <Link to="/" className="btn btn-primary">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Link
                to="/"
                className="mb-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
                <span>←</span> Back to Home
            </Link>

            <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-60 object-cover rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{plant.plantName}</h2>
            <p className="text-gray-600 mb-2">{plant.description}</p>
            <p className="text-green-700 font-semibold mb-2">${plant.price}</p>
            <p className="text-yellow-500">⭐ {plant.rating}</p>
            <p className="text-sm text-gray-500 mt-2">
                Provided by: {plant.providerName}
            </p>
        </div>
    );
};

export default PlantDetails;
