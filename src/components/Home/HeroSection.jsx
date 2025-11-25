import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const stopVideos = () => {
      setTimeout(() => {
        const titleVideo = document.getElementById('tytul-video');
        const quoteVideo = document.getElementById('cytat-video');
        
        if (titleVideo) titleVideo.pause();
        if (quoteVideo) quoteVideo.pause();
      }, 3000);
    };

    stopVideos();
  }, []);

  return (
    <div className="text-center">
      <div className="tytul-video h-200 max-w-full w-full mx-auto my-2 bg-transparent">
        <video
          id="tytul-video"
          width="800"
          height="auto"
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-auto block bg-transparent"
        >
          <source src="Tytul.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="napis-video max-w-full w-full mx-auto my-2 bg-transparent">
        <video
          id="cytat-video"
          width="800"
          height="auto"
          autoPlay
          muted
          playsInline
          loop
          className="w-full h-auto block bg-transparent"
        >
          <source src="Cytat.webm" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;