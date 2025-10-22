import React, { useEffect, useState } from "react";

const PlantCareTips = () => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        fetch("/plantsCareTips.json")
            .then((res) => res.json())
            .then((data) => setTips(data));
    }, []);

    return (
        <div className="py-10 bg-green-50">
            <h2 className="text-3xl font-bold text-center mb-6 text-green-700">
                🌿 Plant Care Tips
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
                Learn how to keep your plants healthy and thriving with these simple care tips.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8">
                {tips.map((tip) => (
                    <div
                        key={tip.id}
                        className="bg-white shadow-md rounded-2xl p-5 text-center border border-green-100 hover:shadow-lg transition"
                    >
                        <div className="text-4xl mb-3">{tip.icon}</div>
                        <h3 className="text-lg font-semibold mb-2 text-green-800">
                            {tip.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            {tip.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantCareTips;
