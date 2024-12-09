import React from "react";
import gaming from "../../../assets/gaming.png";

const HomeHero = () => {
  return (
    <section className="bg-gray-800 min-h-[30vh] md:min-h-[40vh] lg:min-h-[50vh] py-20 sm:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Level Up Your Gear: Ultimate Gaming Essentials
            </h1>
            <p className="text-slate-200 mb-4">Exclusive offer: 20% off this week</p>
            <p className="text-white text-3xl font-bold mt-4">GameIt, GetIt</p>
          </div>
          <div>
            <img
              src={gaming}
              alt="gaming"
              className="w-full h-auto max-h-80 sm:max-h-96 lg:max-h-[450px] object-cover rounded-md shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
