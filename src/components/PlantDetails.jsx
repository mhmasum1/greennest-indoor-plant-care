import React, { useState } from "react";
import { useLoaderData, useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PlantDetails = () => {
    const { id } = useParams();
    const data = useLoaderData();
    const plant = data.find(p => p.plantId === parseInt(id));

    const [formData, setFormData] = useState({ name: "", email: "" });

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("🌿 Consultation booked successfully!");
        setFormData({ name: "", email: "" });
    };

    if (!plant) {
        return <p className="text-center py-10 text-gray-500">Plant not found 😕</p>;
    }

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Toaster />
            <Link to="/" className="btn btn-outline mb-4">← Back to Home</Link>

            <img
                src={plant.image}
                alt={plant.plantName}
                className="w-full h-80 object-cover rounded-xl mb-4"
            />

            <h2 className="text-3xl font-bold mb-2">{plant.plantName}</h2>
            <p className="text-gray-600 mb-2">{plant.description}</p>
            <p className="text-green-700 font-semibold mb-2">💲{plant.price}</p>
            <p className="text-yellow-500">⭐ {plant.rating}</p>
            <p className="text-gray-500 mb-4">In Stock: {plant.availableStock}</p>

            {/* Booking Form */}
            <div className="bg-green-50 p-6 rounded-xl shadow mt-6">
                <h3 className="text-xl font-semibold mb-4">Book Consultation</h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="input input-bordered w-full"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="input input-bordered w-full"
                    />
                    <button type="submit" className="btn btn-primary w-full">
                        Book Now
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PlantDetails;
