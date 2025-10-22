import React from 'react';
import { useEffect, useState } from "react";

const GreenExparts = () => {
    const [experts, setExperts] = useState([]);

    useEffect(() => {
        fetch("/exparts.json")
            .then((res) => res.json())
            .then((data) => setExperts(data))
            .catch((err) => console.error("Error loading experts:", err));
    }, []);

    return (
        <div className="py-10 bg-green-50">
            <h2 className="text-3xl font-bold text-center mb-4 text-green-700">
                🌿 Meet Our Green Experts
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Our experienced plant specialists are here to help you grow your indoor garden.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
                {experts.map((expert) => (
                    <div
                        key={expert.id}
                        className="bg-white shadow-md rounded-2xl p-5 text-center hover:shadow-lg transition"
                    >
                        <img
                            src={expert.image}
                            alt={expert.name}
                            className="w-28 h-28 object-cover rounded-full mx-auto mb-3"
                        />
                        <h3 className="text-lg font-semibold mb-1 text-green-800">{expert.name}</h3>
                        <p className="text-gray-600 text-sm">{expert.specialization}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GreenExparts;