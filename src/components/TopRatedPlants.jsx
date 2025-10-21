import React, { useEffect, useState } from 'react';

const TopRatedPlants = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        // Fetch plants from public folder
        fetch('/plants.json')
            .then(res => res.json())
            .then(data => {
                // Sort by rating and get top 6
                const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 6);
                setPlants(topRated);
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-3">
                        Top Rated Indoor Plants 🌟
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Our customers' favorite plants
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {plants.map((plant) => (
                        <div
                            key={plant.plantId}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300"
                        >
                            <img
                                src={plant.image}
                                alt={plant.plantName}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {plant.plantName}
                                    </h3>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                        {plant.category}
                                    </span>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {plant.description}
                                </p>

                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-yellow-500 text-lg">⭐</span>
                                    <span className="font-semibold text-gray-700">{plant.rating}</span>
                                    <span className="text-gray-500 text-sm">
                                        ({plant.availableStock} in stock)
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">
                                            ${plant.price}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Care: {plant.careLevel}
                                        </p>
                                    </div>
                                    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopRatedPlants;