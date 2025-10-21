import React from 'react';
import Hero from '../components/Hero';
import TopRatedPlants from '../components/TopRatedPlants';

const Home = () => {
    return (
        <div>
            <h2> This is Home Page !</h2>
            <Hero></Hero>
            <TopRatedPlants></TopRatedPlants>
        </div>
    );
};

export default Home;