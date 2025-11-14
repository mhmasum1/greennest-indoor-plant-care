import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
    {
        id: 1,
        title: "Welcome to GreenHome 🌿",
        subtitle: `"Water with love, grow with care!" | "Nurture nature, one leaf at a time."`,
        img: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=1600&q=80&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "Easy Care Plants 🔆",
        subtitle: `"Sprinkle kindness, watch plants thrive!" | "Green today, thriving tomorrow!"`,
        img: "https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=1600&q=80&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Fresh & Healthy 💚",
        subtitle: `"Tend with heart, bloom with joy!" | "Let your plants shine with care!"`,
        img: "https://images.unsplash.com/photo-1466781783364-36c955e42a7f?w=1600&q=80&auto=format&fit=crop"
    },
];

const Hero = () => {
    return (
        <Swiper
            navigation={true}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            loop={true}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-96 md:h-[500px] hero-swiper"
        >
            {slides.map((s) => (
                <SwiperSlide key={s.id}>
                    <div className="w-full h-full relative overflow-hidden"> {/* Changed height to h-full */}
                        {/* Image Section */}
                        <img
                            src={s.img}
                            alt={s.title}
                            // object-cover ensures the image fills the container, cropping if aspect ratios differ.
                            // object-center tries to keep the center of the image visible.
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* Overlay Section */}
                        <div className="absolute inset-0 bg-black/50"></div> {/* Slightly darker overlay for better text contrast */}

                        {/* Text Content */}
                        <div className="relative z-10 flex items-center justify-center h-full px-4">
                            <div className="text-center max-w-3xl">
                                <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-lg"> {/* Added drop-shadow-lg for better visibility */}
                                    {s.title}
                                </h1>
                                <p className="text-sm md:text-lg text-white drop-shadow-md"> {/* Changed to full white and added drop-shadow-md */}
                                    {s.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Hero;