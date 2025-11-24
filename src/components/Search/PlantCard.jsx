import React from 'react';
import InsectIcons from '../UI/InsectIcons';

const PlantCard = ({ plant }) => {
  return (
    <div className="wynik-roslina relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 shadow-lg transition-all duration-300 border border-[rgba(164,150,217,0.2)] hover:-translate-y-2 hover:shadow-xl overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#49733D] to-[#A496D9]"></div>
      
      <div className="image-container relative w-full h-48 mb-4">
        <img
          src={plant.image}
          alt={plant.name}
          className="w-full h-full object-cover rounded-xl"
        />
        <InsectIcons insects={plant.insects} />
      </div>
      
      <h3 className="text-[#49733D] mb-3 text-xl font-semibold">{plant.name}</h3>
      <p className="text-gray-600 leading-relaxed text-base flex-grow mb-2">{plant.description}</p>
    </div>
  );
};

export default PlantCard;