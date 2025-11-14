import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopRatedPlants = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/plants.json")
            .then((res) => res.json())
            .then((data) => setCards(data))
            .catch((err) => console.error("plants.json fetch error:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-6 text-center">Loading plants...</div>;

    return (
        <div className="px-10 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">
                All Plants Here: {cards.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((plant) => (
                    <div
                        key={plant.plantId}
                        className="border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 bg-white p-4"
                    >
                        {/* Image Container - Fixed Height with Object Cover */}
                        <div className="w-full h-56 overflow-hidden bg-gray-100 rounded-xl">
                            <img
                                src={plant.image}
                                alt={plant.plantName}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="pt-4 text-center">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                                {plant.plantName}
                            </h3>

                            <p className="text-gray-500 text-sm mb-3">
                                {plant.category}
                            </p>

                            <div className="flex items-center justify-between mb-3">
                                <p className="text-green-600 font-bold text-xl">
                                    ${plant.price}
                                </p>
                                <div className="flex items-center gap-1">
                                    <span className="text-yellow-500">⭐</span>
                                    <span className="font-medium text-gray-700">
                                        {plant.rating}
                                    </span>
                                </div>
                            </div>

                            <Link
                                to={`/plants/${plant.plantId}`}
                                className="btn btn-primary btn-sm w-full"
                            >
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopRatedPlants;