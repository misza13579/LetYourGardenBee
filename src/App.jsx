import React from 'react';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import WaveBackground from './components/Layout/WaveBackground';
import HeroSection from './components/Home/HeroSection';
import ProjectDescription from './components/Home/ProjectDescription';
import GardenPlanner from './components/Planner/GardenPlanner';
import SearchSection from './components/Search/SearchSection';
import PluginSection from './components/Plugin/PluginSection';
import './styles/globals.css';

const App = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <WaveBackground />
      <Navbar />
      
      <main>
        <section id="strona-glowna" className="min-h-screen pt-16">
          <div className="container mx-auto px-4 py-8">
            <HeroSection />
            <ProjectDescription />
          </div>
        </section>

        <section id="projekt" className="py-16">
          <div className="container mx-auto px-4">
            <GardenPlanner />
          </div>
        </section>

        <section id="wyszukiwarka" className="py-16">
          <div className="container mx-auto px-4">
            <SearchSection />
          </div>
        </section>

        <section id="wtyczka" className="py-16">
          <div className="container mx-auto px-4">
            <PluginSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;