import React from 'react';
import Slider from '../UI/Slider';
import { homePagePlants } from '../../data/plantDatabase';

const PlantGrid = () => {
  return (
    <>
      <h2 className="text-[#49733D] mb-6 text-2xl text-center border-b-2 border-[#F2E9BB] pb-3">
        Odkryj Ciekawe Rośliny
      </h2>
      <div className="rosliny-grid grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {homePagePlants.map((plant, index) => (
          <div
            key={index}
            className="roslina-karta bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 text-center shadow-lg transition-all duration-300 border border-[rgba(164,150,217,0.2)] hover:-translate-y-2 hover:shadow-xl"
          >
            <Slider images={plant.sliderImages} />
            <h3 className="text-[#49733D] mb-2 text-lg font-semibold">{plant.name}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{plant.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlantGrid;