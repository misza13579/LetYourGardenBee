import React from 'react';

const WaveBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] opacity-70 pointer-events-none">
      <div className="absolute w-[80vw] h-[80vw] -top-[30%] -left-[20%] bg-[rgba(196,193,217,0.2)] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[faluj_25s_linear_infinite]"></div>
      <div className="absolute w-[60vw] h-[60vw] top-[10%] -right-[15%] bg-[rgba(242,233,187,0.15)] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[faluj_20s_linear_infinite_reverse]"></div>
      <div className="absolute w-[90vw] h-[90vw] -bottom-[40%] -left-[10%] bg-[rgba(255,215,0,0.25)] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[faluj_30s_linear_infinite]"></div>
      <div className="absolute w-[50vw] h-[50vw] -bottom-[10%] -right-[15%] bg-[rgba(73,115,61,0.2)] rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%] animate-[faluj_18s_linear_infinite_reverse]"></div>
    </div>
  );
};

export default WaveBackground;