import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);
    const [formData, setFormData] = useState({ name: "", email: "" });

    useEffect(() => {
        fetch('/plants.json')
            .then(res => res.json())
            .then(data => {
                const p = data.find(x => String(x.plantId) === String(id));
                setPlant(p);
            });
    }, [id]);

    if (!plant) return <p className="py-10 text-center">Loading plant...</p>;

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Consultation booked successfully!");
        setFormData({ name: "", email: "" });
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Toaster />
            <Link to="/" className="btn btn-outline mb-4">← Back to Home</Link>
            <div className="flex flex-col  items-center">

                <img src={plant.image} alt={plant.plantName} className="w-full md:w-1/2 h-80 object-cover rounded-xl mb-4 md:mr-4" />


                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold mb-2">{plant.plantName}</h2>
                    <p className="text-gray-700 mb-2">{plant.description}</p>
                    <p className="text-green-600 font-semibold mb-2">Price: ${plant.price}</p>
                    <p className="text-yellow-500 mb-2">Rating: ⭐ {plant.rating}</p>
                    <p className="text-gray-600 mb-4">Available Stock: {plant.availableStock}</p>


                    <h3 className="text-xl font-semibold mb-4">Book Consultation</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="input input-bordered w-full"
                            required
                        />
                        <button type="submit" className="btn btn-primary w-full">Book Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;
