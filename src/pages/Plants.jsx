import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Plants = () => {
    const [plants, setPlants] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/plants.json')
            .then((res) => res.json())
            .then((data) => {
                setPlants(data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                console.error('Error fetching plants:', err);
            });
    }, []);

    if (loading) {
        return (
            <div className="text-center py-10">
                <span className="loading loading-spinner loading-lg"></span> Loading plants...
            </div>
        );
    }

    if (!plants.length) {
        return <p className="text-center py-10">No plants found in the cart.</p>;
    }

    const handlePlantClick = (plantId) => {
        navigate(`/plants/${plantId}`);
    };

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <Toaster />
            <h2 className="text-4xl font-bold mb-8 text-center">Plants</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {plants.map((plant) => (

                    <div
                        key={plant.plantId}
                        className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col p-6"
                    >
                        <img
                            src={plant.image}
                            alt={plant.plantName}
                            className="w-full h-60 md:h-72 object-cover rounded-2xl"
                        />

                        <div className="mt-4 flex flex-col gap-1 flex-1">
                            <h3 className="font-semibold text-xl">{plant.plantName}</h3>
                            <p className="text-gray-600 text-sm">{plant.category}</p>
                            <p className="text-green-600 font-bold text-lg mt-1">
                                ${plant.price}
                            </p>

                            <div className="flex justify-between items-center mt-3">
                                <p className="text-yellow-500 font-medium">⭐ {plant.rating}</p>
                                <button
                                    onClick={() => handlePlantClick(plant.plantId)}
                                    className="btn btn-sm btn-primary px-4"
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

            <div className="mt-8 text-center">
                <Link to="/" className="btn btn-secondary">
                    Go Back to Home
                </Link>
            </div>
        </div>
    );
};

export default Plants;
