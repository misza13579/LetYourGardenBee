import React from 'react';
import AdvancedGardenPlanner from './GardenEditor';

const GardenPlanner = () => {
  return (
    <div className="baner bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/40 w-full">
      <h2 className="text-[#49733D] mb-8 text-3xl text-center border-b-3 border-[#F2E9BB] pb-4">
        Zaplanuj swój ogród
      </h2>
      <AdvancedGardenPlanner/>
    </div>
  );
};

export default GardenPlanner;