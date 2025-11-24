import React from 'react';

const InsectIcons = ({ insects, className = "" }) => {
  if (!insects || insects.length === 0) return null;

  return (
    <div className={`owady-container absolute top-2 right-2 flex gap-1 z-5 h-20 w-28 ${className}`}>
      {insects.includes('pszczolka') && (
        <img
          src="pszczolka.png"
          alt="Pszczoła"
          className="owad pszczolka w-10 h-10 object-contain filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-unoszenie"
        />
      )}
      {insects.includes('motylek') && (
        <img
          src="motylek.png"
          alt="Motyl"
          className="owad motylek w-10 h-10 object-contain filter drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] drop-shadow-[0_0_6px_rgba(255,255,255,0.8)] animate-unoszenie"
          style={{ animationDelay: '1.5s' }}
        />
      )}
    </div>
  );
};

export default InsectIcons;