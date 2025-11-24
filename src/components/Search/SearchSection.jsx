import React, { useState, useRef, useEffect } from 'react';
import PlantCard from './PlantCard';
import { plantDatabase } from '../../data/plantDatabase';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(plantDatabase);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults(plantDatabase);
      return;
    }

    const query = searchQuery.toLowerCase().trim();
    const foundPlants = plantDatabase.filter(plant =>
      plant.name.toLowerCase().includes(query) ||
      plant.description.toLowerCase().includes(query)
    );

    setSearchResults(foundPlants);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      const filteredSuggestions = plantDatabase
        .filter(plant => plant.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (plantName) => {
    setSearchQuery(plantName);
    setShowSuggestions(false);
    handleSearch();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="baner bg-white/90 rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/40 w-full">
      <h2 className="text-[#49733D] mb-8 text-3xl text-center border-b-3 border-[#F2E9BB] pb-4">
        Wyszukiwarka Roślin
      </h2>
      <p className="wyszukiwarka-intro text-lg leading-loose mb-8 text-center bg-white/70 p-4 rounded-xl shadow-lg">
        Znajdź idealne rośliny do swojego ogrodu! Wyszukuj według nazwy, rodzaju, wymagań uprawowych lub właściwości. Oznaczenia owadów wskazują rośliny przyjazne zapylaczom.
      </p>
      
      <div className="formularz-wyszukiwania flex justify-center mb-8 gap-0 relative w-full max-w-2xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Wpisz nazwę rośliny, rodzaj lub właściwość..."
            className="w-full px-6 py-4 border-2 border-[#C4C1D9] rounded-l-3xl rounded-r-none text-lg outline-none transition-all duration-300 shadow-lg focus:border-[#49733D] focus:ring-3 focus:ring-[rgba(73,115,61,0.2)]"
          />
          
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionsRef}
              className="autocomplete-suggestions absolute top-full left-0 right-0 bg-white border-2 border-[#C4C1D9] border-t-0 rounded-b-2xl max-h-50 overflow-y-auto z-1000 shadow-lg w-full"
            >
              {suggestions.map((plant, index) => (
                <div
                  key={index}
                  className="autocomplete-suggestion px-4 py-3 cursor-pointer border-b border-gray-100 transition-colors duration-200 text-base hover:bg-gray-50"
                  onClick={() => handleSuggestionClick(plant.name)}
                >
                  {plant.name}
                </div>
              ))}
            </div>
          )}
        </div>
        
        <button
          onClick={handleSearch}
          className="px-8 py-4 bg-gradient-to-r from-[#49733D] to-[#A496D9] text-white border-none rounded-r-3xl cursor-pointer text-lg font-semibold transition-all duration-300 shadow-lg hover:translate-x-0.5 hover:shadow-xl whitespace-nowrap"
        >
          Szukaj Roślin
        </button>
      </div>
      
      <div className="wyniki-wyszukiwania-container bg-white/80 rounded-2xl p-6 mt-8 max-h-[600px] overflow-y-auto shadow-lg">
        <div className="wyniki-wyszukiwania grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {searchResults.length > 0 ? (
            searchResults.map((plant, index) => (
              <PlantCard key={index} plant={plant} />
            ))
          ) : (
            <div className="wynik-roslina col-span-full text-center py-8">
              <h3 className="text-[#49733D] text-xl mb-2">Brak wyników</h3>
              <p className="text-gray-600">Spróbuj użyć innych słów kluczowych.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;