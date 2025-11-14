import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Cart = () => {
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
        return <div className="text-center py-10"><span className="loading loading-spinner loading-lg"></span> Loading plants...</div>;
    }

    if (!plants.length) {
        return <p className="text-center py-10">No plants found in the cart.</p>;
    }


    const handlePlantClick = (plantId) => {
        navigate(`/plants/${plantId}`);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Toaster />
            <h2 className="text-3xl font-bold mb-6 text-center"> Plants</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plants.map((plant) => (
                    <div key={plant.plantId} className="border rounded-2xl shadow-lg p-4">
                        <img src={plant.image} alt={plant.plantName} className="w-full h-40 object-cover rounded-xl mb-3" />
                        <h3 className="font-semibold text-lg">{plant.plantName}</h3>
                        <p className="text-gray-600">{plant.category}</p>
                        <p className="text-green-600 font-bold">${plant.price}</p>
                        <div className="flex justify-between items-center mt-2">
                            <p className="text-yellow-500">⭐ {plant.rating}</p>
                            <button
                                onClick={() => handlePlantClick(plant.plantId)}
                                className="btn btn-sm btn-primary"
                            >
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-center">
                <Link to="/" className="btn btn-secondary">Go Back to Home</Link>
            </div>
        </div>
    );
};

export default Cart;
