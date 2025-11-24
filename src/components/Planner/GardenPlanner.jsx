import React from 'react';
import AdvancedGardenPlanner from './GardenEditor';

const GardenPlanner = () => {
  return (
    <div className="baner bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/40 w-full">
      <h2 className="text-[#49733D] mb-8 text-3xl text-center border-b-3 border-[#F2E9BB] pb-4">
        Zaplanuj swój ogród
      </h2>
      <p className="projekt-intro text-lg leading-loose mb-8 text-center bg-white/70 p-4 rounded-xl shadow-lg">
        Poznaj szczegóły mojego autorskiego projektu botanicznego, który łączy w sobie pasję do roślin z nowoczesnym podejściem do ich dokumentacji i uprawy. Projekt rozwija się dynamicznie, wzbogacając się o nowe odkrycia i obserwacje.
      </p>
      
      <AdvancedGardenPlanner/>
    </div>
  );
};

export default GardenPlanner;