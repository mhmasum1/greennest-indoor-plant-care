import React, { Suspense } from "react";
import Hero from "../components/Hero";
import TopRatedPlants from "../components/TopRatedPlants";
import PlantCareTips from "../components/PlantsCareTips";
import GreenExparts from "../components/GreenExparts";
import PlantOfTheWeek from "../components/PlantOfTheWeek";

const Home = () => {
    return (
        <div>
            <Hero />

            <Suspense
                fallback={
                    <div className="flex justify-center py-10">
                        <span className="loading loading-dots loading-lg"></span>
                    </div>
                }
            >
                <TopRatedPlants />
            </Suspense>
            <PlantOfTheWeek />
            <PlantCareTips />
            <GreenExparts />
        </div>
    );
};

export default Home;
