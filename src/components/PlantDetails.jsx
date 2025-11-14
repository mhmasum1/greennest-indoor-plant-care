import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        fetch('/plants.json')
            .then(res => res.json())
            .then(data => {
                const p = data.find(x => String(x.plantId) === String(id));
                setPlant(p);
            });
    }, [id]);

    if (!plant) return <p className="py-10 text-center">Loading plant...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link to="/" className="btn btn-outline mb-4">← Back to Home</Link>
            <img src={plant.image} alt={plant.plantName} className="w-full h-80 object-cover rounded-xl mb-4" />
            <h2 className="text-3xl font-bold mb-2">{plant.plantName}</h2>
            {/* ... rest ... */}
        </div>
    );
};

export default PlantDetails;
