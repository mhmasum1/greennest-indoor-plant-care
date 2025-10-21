import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Hero = () => {
    return (
        <Swiper
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000 }}
            className="w-full h-96 md:h-[500px] hero-swiper"
        >
            {/* Slide 1 */}
            <SwiperSlide>
                <div
                    className="w-full h-full flex items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1200')`
                    }}
                >
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            Welcome to GreenHome 🌿
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-6">
                            Find your perfect indoor plant
                        </p>
                        <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition">
                            Shop Now
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
                <div
                    className="w-full h-full flex items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=1200')`
                    }}
                >
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            Easy Care Plants 🪴
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-6">
                            Perfect for beginners
                        </p>
                        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition">
                            View Plants
                        </button>
                    </div>
                </div>
            </SwiperSlide>

            {/* Slide 3 */}
            <SwiperSlide>
                <div
                    className="w-full h-full flex items-center justify-center bg-cover bg-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1200')`
                    }}
                >
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                            Fresh & Healthy 💚
                        </h1>
                        <p className="text-lg md:text-xl text-white mb-6">
                            Air purifying plants
                        </p>
                        <button className="bg-yellow-600 text-white px-8 py-3 rounded-lg hover:bg-yellow-700 transition">
                            Explore
                        </button>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};

export default Hero;