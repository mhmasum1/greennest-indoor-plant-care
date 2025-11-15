import React from "react";

const plant = {
    name: "Spider Plant",
    latinName: "Chlorophytum comosum",
    image:
        "https://images.pexels.com/photos/6208085/pexels-photo-6208085.jpeg?auto=compress&cs=tinysrgb&w=800",
    careLevel: "Very Easy",
    light: "Bright, indirect light",
    water: "Water once or twice a week",
    funFact:
        "Spider plants are excellent natural air purifiers and help remove toxins from indoor air.",
    tips: [
        "Do not let the soil dry out completely.",
        "Place it near a window with indirect sunlight.",
        "Water 1–2 times per week."
    ],
};

const PlantOfTheWeek = () => {
    return (
        <section className="mt-16 px-6 py-10">
            <h2 className="text-2xl font-bold mb-4 text-center">🌿 Plant of the Week</h2>

            <div className="card lg:card-side bg-base-100 shadow-md border p-6">
                <figure className="lg:w-1/3 max-h-72 overflow-hidden">
                    <img
                        src={plant.image}
                        alt={plant.name}
                        className="w-full h-full object-cover"
                    />
                </figure>

                <div className="card-body lg:w-2/3">
                    <h3 className="card-title text-xl">
                        {plant.name}
                        <span className="text-sm font-normal text-gray-500">
                            &nbsp;({plant.latinName})
                        </span>
                    </h3>

                    <p className="text-sm text-gray-700 mb-2">{plant.funFact}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm mb-3">
                        <div className="p-2 rounded bg-green-50">
                            <p className="font-semibold text-xs text-gray-600">Care Level</p>
                            <p>{plant.careLevel}</p>
                        </div>
                        <div className="p-2 rounded bg-green-50">
                            <p className="font-semibold text-xs text-gray-600">Light</p>
                            <p>{plant.light}</p>
                        </div>
                        <div className="p-2 rounded bg-green-50">
                            <p className="font-semibold text-xs text-gray-600">Water</p>
                            <p>{plant.water}</p>
                        </div>
                    </div>

                    <div>
                        <p className="font-semibold text-sm mb-1">Care Tips:</p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                            {plant.tips.map((tip, i) => (
                                <li key={i}>{tip}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlantOfTheWeek;
