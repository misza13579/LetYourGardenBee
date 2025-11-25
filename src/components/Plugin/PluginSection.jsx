import React from 'react';

const PluginSection = () => {
  const pobierzWtyczke = () => {
    window.open('https://drive.google.com/file/d/1RqN1NjHbpSGamgjACCO6k2hBcnCVSxIJ/view?usp=drive_link', '_blank');
  };

  return (
    <div className="baner bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/40 w-full">
      <h2 className="text-[#49733D] mb-8 text-3xl text-center border-b-3 border-[#F2E9BB] pb-4">
        Pobierz Naszą Wtyczkę
      </h2>
      <p className="wtyczka-intro text-lg leading-loose mb-8 text-center bg-white/70 p-4 rounded-xl shadow-lg">
        Zainstaluj naszą wtyczkę do przeglądarki i odkrywaj rośliny przyjazne owadom podczas zakupów online! Wtyczka automatycznie wykrywa rośliny na stronach sklepów ogrodniczych i pokazuje informacje o tym, jakie owady przyciągają.
      </p>
      
      <button
        onClick={pobierzWtyczke}
        className="pobierz-wtyczke bg-gradient-to-br from-[#49733D] to-[#A496D9] text-white border-none px-8 py-4 text-lg font-semibold rounded-3xl cursor-pointer transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl mx-auto flex items-center justify-center gap-3 my-4"
      >
        <img src="pszczolka.png" alt="Pszczoła" className="w-6 h-6 object-contain" />
        Pobierz Wtyczkę
      </button>
      
      <div className="instrukcja-wtyczki bg-white/90 p-6 rounded-2xl mt-8 text-left shadow-lg">
        <h3 className="text-[#49733D] mb-4 text-xl text-center">Jak zainstalować wtyczkę?</h3>
        <ol className="pl-6 mb-6 list-decimal space-y-2">
          <li>
            <strong>Waterfox:</strong> Otwórz about:debugging → "This Waterfox" → "Load Temporary Add-on" → wybierz plik manifest.json
          </li>
          <li>
            <strong>Firefox:</strong> about:debugging → "This Firefox" → "Load Temporary Add-on" → wybierz plik manifest.json
          </li>
          <li>
            <strong>Chrome/Edge:</strong> Otwórz rozszerzenia (chrome://extensions/ lub edge://extensions/) → Włącz tryb dewelopera → "Load unpacked" → wybierz folder z wtyczką
          </li>
        </ol>
        <p className="text-base leading-relaxed">
          <strong>Działanie:</strong> Po instalacji na stronach sklepów ogrodniczych pojawi się przycisk{' '}
          <img src="pszczolka.png" alt="Pszczoła" className="wtyczka-icon inline-block w-6 h-6 mr-1 align-middle" />. 
          Kliknij go, aby zobaczyć informacje o tym, dla jakich owadów jest przyjazna dana roślina.
        </p>
      </div>
    </div>
  );
};

export default PluginSection;