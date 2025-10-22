import React, { use } from "react";
import { Link } from "react-router-dom";

const displayCardsPromise = fetch("/plants.json").then(res => res.json());

const TopRatedPlants = () => {
    const cards = use(displayCardsPromise);

    return (
        <div className="px-10 py-6">
            <h2 className="text-2xl font-bold text-center mb-6">
                All Plants Here: {cards.length}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((plant) => (
                    <div
                        key={plant.plantId}
                        className="border rounded-2xl shadow hover:shadow-lg transition p-4"
                    >
                        <img
                            src={plant.image}
                            alt={plant.plantName}
                            className="w-full h-40 object-cover rounded-xl mb-3"
                        />
                        <h3 className="font-semibold text-lg">{plant.plantName}</h3>
                        <p className="text-gray-600 text-sm">{plant.category}</p>
                        <p className="text-green-600 font-bold">${plant.price}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-yellow-500">⭐ {plant.rating}</p>

                            {/* ✅ Dynamic route link */}
                            <Link
                                to={`/plants/${plant.plantId}`}
                                className="btn btn-sm btn-primary"
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
