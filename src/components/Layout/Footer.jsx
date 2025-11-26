import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[rgba(73,115,61,0.95)] to-[rgba(164,150,217,0.95)] text-white text-center py-12 mt-16 relative backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <p className="text-lg">Amelia Stróżyńska i Michał Błaszczykiewicz</p>
        <p className="text-lg"> Wykorzystano model Llama 3.1 na licencji Community License Agreement od Meta</p>
      </div>
    </footer>
  );
};

export default Footer;