import React, { useState } from "react";

const createEmptyGarden = (width, height) => 
  Array.from({ length: height }, () => 
    Array.from({ length: width }, () => ({ type: 'empty' }))
  );

const PLANT_DATABASE = {
  sunflower: {
    id: 'sunflower',
    name: 'Słonecznik',
    blooming: ['VII', 'VIII', 'IX'],
    height: '200-300 cm',
    soil: 'przepuszczalna',
    sun: 'słoneczne',
    insects: ['pszczoły', 'trzmiele'],
    image: '/sloneczniki.png',
    density: "1-2 rośliny/m²", 
    waterNeed: 30, 
    maintenance: 2, 
    description: "Roślina jednoroczna, łatwa w uprawie, wymaga podpór"
  },
  lavender: {
    id: 'lavender',
    name: 'Lawenda',
    blooming: ['VI', 'VII', 'VIII'],
    height: '30-50 cm',
    soil: 'wapienna',
    sun: 'słoneczne',
    insects: ['pszczoły', 'motyle'],
    image: '/lawenda.png',
    density: "4-6 roślin/m²",
    waterNeed: 15,
    maintenance: 1,
    description: "Wieloletnia, odporna na suszę, przycinana wiosną"
  },
  rose: {
    id: 'rose',
    name: 'Róża',
    blooming: ['VI', 'VII', 'VIII', 'IX'],
    height: '50-150 cm',
    soil: 'żyzna',
    sun: 'słoneczne',
    insects: ['pszczoły', 'trzmiele'],
    image: '/roze.png',
    density: "1-3 rośliny/m²",
    waterNeed: 40,
    maintenance: 4,
    description: "Wymaga regularnego nawożenia i przycinania"
  }
};

const TERRAIN_ELEMENTS = {
  grass: {
    id: 'grass',
    name: 'Trawa',
    image: '/trawa.png',
    waterNeed: 50,
    maintenance: 3
  },
  water: {
    id: 'water',
    name: 'Woda',
    image: '/woda.png',
    waterNeed: 0, 
    maintenance: 1
  },
  building: {
    id: 'building',
    name: 'Zabudowa',
    image: '/cegly.png',
    waterNeed: 0,
    maintenance: 0
  },
  soil: {
    id: 'soil',
    name: 'Ziemia',
    image: '/ziemia.png',
    waterNeed: 0,
    maintenance: 0
  }
};

const INSECTS_DATABASE = {
  bees: {
    id: 'bees',
    name: 'Pszczoły',
    plants: ['sunflower', 'lavender'],
    description: 'Zapylają większość roślin, potrzebują wody i schronienia',
    image: '/pszczolka.png',
    attractionScores: {
      sunflower: 8,
      lavender: 9,
      rose: 6
    }
  },
  butterflies: {
    id: 'butterflies',
    name: 'Motyle',
    plants: ['lavender'],
    description: 'Preferują płaskie kwiatostany, potrzebują roślin żywicielskich',
    image: '/motylek.png',
    attractionScores: {
      lavender: 10,
      sunflower: 3,
      rose: 4
    }
  }
};

const BLOOMING_CALENDAR = {
  IV: [], 
  V: [],  
  VI: ['rose', 'lavender'],
  VII: ['rose', 'lavender', 'sunflower'],
  VIII: ['rose', 'lavender', 'sunflower'],
  IX: ['rose', 'sunflower']
};

const GardenChatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Cześć! Jestem Twoim asystentem ogrodowym. Zapytaj mnie o rośliny, owady lub planowanie ogrodu! 🌸" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const callAI = async (userMessage) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: `Jesteś asystentem ogrodowym specjalizującym się w roślinach przyjaznych owadom. Odpowiadaj w języku polskim. Pytanie: ${userMessage}` 
        })
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      return data.reply;
      
    } catch (error) {
      console.error('Błąd API:', error);
      return "Przepraszam, mam problem z połączeniem. Spróbuj ponownie za chwilę.";
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage = { type: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    
    const aiResponse = await callAI(inputText);
    setMessages(prev => [...prev, { type: 'bot', text: aiResponse }]);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20 h-[400px] flex flex-col">
      <h3 className="text-xl text-[#49733D] mb-4">Asystent Ogrodowy AI</h3>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[80%] ${
              message.type === 'user'
                ? 'bg-[#49733D] text-white ml-auto'
                : 'bg-[#A496D9]/20 text-[#49733D]'
            }`}
          >
            {message.text}
          </div>
        ))}
        {isLoading && (
          <div className="p-3 rounded-xl max-w-[80%] bg-[#A496D9]/20 text-[#49733D]">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-[#49733D] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#49733D] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#49733D] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span>Asystent myśli...</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Zapytaj o rośliny, owady lub pielęgnację..."
          className="flex-1 px-3 py-2 border border-[#A496D9]/30 rounded-lg focus:outline-none focus:border-[#49733D]"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputText.trim()}
          className="px-4 py-2 bg-[#49733D] text-white rounded-lg hover:bg-[#49733D]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? '...' : 'Wyślij'}
        </button>
      </div>
    </div>
  );
};

export default function AdvancedGardenPlanner() {
  const [activeTab, setActiveTab] = useState('design');
  const [gardenWidth, setGardenWidth] = useState(16);
  const [gardenHeight, setGardenHeight] = useState(12);
  const [garden, setGarden] = useState(() => createEmptyGarden(16, 12));
  const [selectedElement, setSelectedElement] = useState(PLANT_DATABASE.sunflower);
  const [seasonFilter, setSeasonFilter] = useState('all');
  const [selectedInsect, setSelectedInsect] = useState(null);
  const [isSelectingArea, setIsSelectingArea] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [customWidth, setCustomWidth] = useState(16);
  const [customHeight, setCustomHeight] = useState(12);
  const [deleteMode, setDeleteMode] = useState(false);

  const handleCellMouseDown = (x, y) => {
    if (!selectedElement || deleteMode) return;
    setIsSelectingArea(true);
    setSelectionStart({ x, y });
    setSelectionEnd({ x, y });
  };

  const handleCellMouseEnter = (x, y) => {
    if (isSelectingArea && selectionStart) {
      setSelectionEnd({ x, y });
    }
  };

  const handleCellMouseUp = () => {
    if (isSelectingArea && selectionStart && selectionEnd && selectedElement && !deleteMode) {
      const startX = Math.min(selectionStart.x, selectionEnd.x);
      const endX = Math.max(selectionStart.x, selectionEnd.x);
      const startY = Math.min(selectionStart.y, selectionEnd.y);
      const endY = Math.max(selectionStart.y, selectionEnd.y);

      setGarden(prev => {
        const newGarden = prev.map(row => [...row]);
        for (let y = startY; y <= endY; y++) {
          for (let x = startX; x <= endX; x++) {
            newGarden[y][x] = { 
              type: 'element', 
              element: selectedElement,
              timestamp: Date.now()
            };
          }
        }
        return newGarden;
      });
    }
    setIsSelectingArea(false);
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleCellDelete = (x, y) => {
    setGarden(prev => {
      const newGarden = prev.map(row => [...row]);
      newGarden[y][x] = { type: 'empty' };
      return newGarden;
    });
  };

  const handleSingleCellClick = (x, y) => {
    if (deleteMode) {
      handleCellDelete(x, y);
      return;
    }
    
    if (!selectedElement || isSelectingArea) return;
    
    setGarden(prev => {
      const newGarden = prev.map(row => [...row]);
      newGarden[y][x] = { 
        type: 'element',
        element: selectedElement,
        timestamp: Date.now()
      };
      return newGarden;
    });
  };

  const updateGardenSize = () => {
    setGardenWidth(customWidth);
    setGardenHeight(customHeight);
    setGarden(createEmptyGarden(customWidth, customHeight));
  };

const calculateAdvancedStats = () => {
  const allCells = garden.flat();
  const totalArea = gardenWidth * gardenHeight; 
  
  const plantCells = allCells.filter(cell => cell.type === 'element' && cell.element.id in PLANT_DATABASE);
  const terrainCells = allCells.filter(cell => cell.type === 'element' && cell.element.id in TERRAIN_ELEMENTS);
  const waterSources = allCells.filter(cell => cell.element?.id === 'water').length;
  const emptyCells = allCells.filter(cell => cell.type === 'empty').length;

  const plantStats = plantCells.reduce((acc, cell) => {
    const plantId = cell.element.id;
    if (!acc[plantId]) {
      acc[plantId] = { count: 0, area: 0, plant: PLANT_DATABASE[plantId] };
    }
    acc[plantId].count++;
    acc[plantId].area++;
    return acc;
  }, {});

  const annualWaterNeed = allCells.reduce((total, cell) => {
    if (cell.type === 'element' && cell.element.waterNeed) {
      return total + cell.element.waterNeed;
    }
    return total;
  }, 0);

  const maintenanceAnalysis = allCells.reduce((acc, cell) => {
    if (cell.type === 'element' && cell.element.maintenance) {
      acc.totalDifficulty += cell.element.maintenance;
      acc.elementsWithDifficulty++;
    }
    return acc;
  }, { totalDifficulty: 0, elementsWithDifficulty: 0 });

  const averageDifficulty = maintenanceAnalysis.elementsWithDifficulty > 0 
    ? (maintenanceAnalysis.totalDifficulty / maintenanceAnalysis.elementsWithDifficulty).toFixed(1)
    : 0;

  const getDifficultyDescription = (difficulty) => {
    if (difficulty === 0) return 'Brak roślin';
    if (difficulty < 2) return 'Bardzo łatwy';
    if (difficulty < 3) return 'Łatwy';
    if (difficulty < 4) return 'Średni';
    return 'Trudny';
  };

  const insectAttraction = Object.keys(INSECTS_DATABASE).reduce((acc, insectId) => {
    const insect = INSECTS_DATABASE[insectId];
    let totalScore = 0;
    let maxPossibleScore = 0;

    Object.values(plantStats).forEach(stat => {
      const score = insect.attractionScores[stat.plant.id] || 0;
      totalScore += score * stat.area;
      maxPossibleScore += 10 * stat.area; 
    });

    acc[insectId] = {
      insect,
      score: totalScore,
      percentage: maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0,
      description: totalScore === 0 ? 'Brak roślin przyciągających' :
                   totalScore < 20 ? 'Niskie przyciąganie' :
                   totalScore < 50 ? 'Średnie przyciąganie' : 'Wysokie przyciąganie'
    };
    return acc;
  }, {});

  const bloomingContinuity = () => {
    const months = ['IV', 'V', 'VI', 'VII', 'VIII', 'IX'];
    const continuity = months.map(month => {
      const bloomingCount = Object.values(plantStats).filter(stat => 
        stat.plant.blooming.includes(month)
      ).length;
      return { month, bloomingCount, hasBlooming: bloomingCount > 0 };
    });
    
    const bloomingMonths = continuity.filter(m => m.hasBlooming).length;
    const continuityScore = Math.round((bloomingMonths / months.length) * 100);
    
    return { continuity, score: continuityScore, gaps: months.length - bloomingMonths };
  };

  const biodiversity = () => {
    const plantTypes = new Set();
    const insectTypes = new Set();
    
    allCells.forEach(cell => {
      if (cell.type === 'element' && cell.element.id in PLANT_DATABASE) {
        plantTypes.add(cell.element.id);
        cell.element.insects?.forEach(insect => insectTypes.add(insect));
      }
    });
    
    // POPRAWIONE: Ogranicz do maksymalnie 100%
    const plantDiversity = Math.min((plantTypes.size / Object.keys(PLANT_DATABASE).length) * 100, 100);
    const insectDiversity = Math.min((insectTypes.size / Object.keys(INSECTS_DATABASE).length) * 100, 100);
    
    return {
      plantTypes: plantTypes.size,
      totalPlantTypes: Object.keys(PLANT_DATABASE).length,
      insectTypes: insectTypes.size,
      totalInsectTypes: Object.keys(INSECTS_DATABASE).length,
      plantDiversity: Math.round(plantDiversity),
      insectDiversity: Math.round(insectDiversity),
      overallScore: Math.round((plantDiversity + insectDiversity) / 2)
    };
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const bio = biodiversity();
    const continuity = bloomingContinuity();

    if (bio.plantTypes < 2) {
      recommendations.push({
        type: 'biodiversity',
        message: `Zwiększ różnorodność - masz tylko ${bio.plantTypes} rodzajów roślin`,
        priority: 'high'
      });
    }

    if (annualWaterNeed > 1000) {
      recommendations.push({
        type: 'water',
        message: `Wysokie zapotrzebowanie na wodę: ${annualWaterNeed}L/rok - rozważ rośliny odporne na suszę`,
        priority: 'medium'
      });
    }

    if (continuity.gaps > 2) {
      recommendations.push({
        type: 'blooming',
        message: `Uzupełnij kwitnienie - ${continuity.gaps} miesięcy bez kwitnienia`,
        priority: 'medium'
      });
    }

    if (emptyCells > totalArea * 0.4) {
      recommendations.push({
        type: 'space',
        message: `Wykorzystaj tylko ${Math.round(((totalArea - emptyCells) / totalArea) * 100)}% powierzchni`,
        priority: 'low'
      });
    }

    if (averageDifficulty > 3.5) {
      recommendations.push({
        type: 'maintenance',
        message: `Wysoka trudność pielęgnacji - rozważ łatwiejsze w utrzymaniu rośliny`,
        priority: 'medium'
      });
    }

    return recommendations.slice(0, 5);
  };

  return {
    totalArea,
    plantArea: plantCells.length,
    terrainArea: terrainCells.length,
    emptyArea: emptyCells,
    waterSources,
    
    plantStats,
    annualWaterNeed,
    maintenance: {
      averageDifficulty: parseFloat(averageDifficulty),
      description: getDifficultyDescription(parseFloat(averageDifficulty)),
      totalElements: maintenanceAnalysis.elementsWithDifficulty
    },
    insectAttraction,
    bloomingContinuity: bloomingContinuity(),
    biodiversity: biodiversity(),
    recommendations: generateRecommendations(),
    
    utilization: Math.round(((totalArea - emptyCells) / totalArea) * 100),
    overallScore: Math.round(
      (biodiversity().overallScore * 0.3 +
       bloomingContinuity().score * 0.3 +
       (annualWaterNeed < 500 ? 100 : annualWaterNeed < 1000 ? 80 : 60) * 0.2 +
       (parseFloat(averageDifficulty) < 3 ? 100 : parseFloat(averageDifficulty) < 4 ? 80 : 60) * 0.2)
    )
  };
};

  const stats = calculateAdvancedStats();

  const getPlantsForInsect = (insectId) => {
    const insect = INSECTS_DATABASE[insectId];
    return insect ? insect.plants.map(plantId => PLANT_DATABASE[plantId]) : [];
  };

  const filteredPlants = seasonFilter === 'all' 
    ? Object.values(PLANT_DATABASE)
    : Object.values(PLANT_DATABASE).filter(plant => plant.blooming.includes(seasonFilter));

  const isCellInSelection = (x, y) => {
    if (!selectionStart || !selectionEnd) return false;
    const startX = Math.min(selectionStart.x, selectionEnd.x);
    const endX = Math.max(selectionStart.x, selectionEnd.x);
    const startY = Math.min(selectionStart.y, selectionEnd.y);
    const endY = Math.max(selectionStart.y, selectionEnd.y);
    return x >= startX && x <= endX && y >= startY && y <= endY;
  };

  const DifficultyStars = ({ difficulty }) => {
    const fullStars = Math.floor(difficulty);
    const hasHalfStar = difficulty % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`text-lg ${
              i < fullStars
                ? 'text-yellow-500'
                : i === fullStars && hasHalfStar
                ? 'text-yellow-300'
                : 'text-gray-300'
            }`}
          >
            {i < fullStars ? '★' : i === fullStars && hasHalfStar ? '⯨' : '★'}
          </span>
        ))}
        <span className="text-sm text-[#49733D] ml-1">{difficulty}/5</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A496D9]/10 via-white to-[#49733D]/10">
      <div className="container mx-auto px-4 py-8 max-w-8xl">
        
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 mb-8 border border-[#A496D9]/20">
          <div className="flex flex-col lg:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl text-[#49733D] text-center lg:text-left font-medium">
              Ogrodowy Planer
            </h1>
            <div className="text-[#49733D] text-sm bg-[#A496D9]/20 px-4 py-2 rounded-full">
              Powierzchnia: {stats.totalArea}m² • Wykorzystanie: {stats.utilization}% • Ocena: {stats.overallScore}%
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 bg-[#A496D9]/10 rounded-xl p-1">
            {[
              { id: 'design', label: 'Projektowanie' },
              { id: 'plants', label: 'Baza Roślin' },
              { id: 'insects', label: 'Baza Owadów' },
              { id: 'calendar', label: 'Planer Sezonowy' },
              { id: 'stats', label: 'Statystyki' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[150px] px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-[#49733D] shadow-lg scale-105'
                    : 'text-[#49733D]/80 hover:bg-white/40 hover:text-[#49733D]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="hidden sm:block">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          
          <div className="xl:col-span-1 space-y-6">
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
              <h2 className="text-xl text-[#49733D] mb-4">Rozmiar Ogrodu</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[#49733D] mb-2">
                    Szerokość (1-16):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="16"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(Number(e.target.value))}
                      className="flex-1 h-2 bg-[#A496D9]/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[#49733D] w-8 text-center">{customWidth}</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm text-[#49733D] mb-2">
                    Wysokość (1-16):
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="16"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(Number(e.target.value))}
                      className="flex-1 h-2 bg-[#A496D9]/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-[#49733D] w-8 text-center">{customHeight}</span>
                  </div>
                </div>

                <button
                  onClick={updateGardenSize}
                  className="w-full py-3 bg-[#49733D] hover:bg-[#49733D]/90 text-white rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Zastosuj rozmiar {customWidth}×{customHeight}
                </button>

                <div className="text-xs text-[#49733D] text-center">
                  Aktualny rozmiar: {gardenWidth}×{gardenHeight} ({stats.totalArea}m²)
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
              <h2 className="text-xl text-[#49733D] mb-4">Elementy Ogrodu</h2>
              
              <div className="mb-6">
                <h3 className="text-[#49733D] mb-3">Rośliny:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {filteredPlants.map(plant => (
                    <div
                      key={plant.id}
                      className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all duration-200 ${
                        selectedElement?.id === plant.id
                          ? 'border-[#49733D] bg-[#49733D]/10 shadow-lg scale-105'
                          : 'border-[#A496D9]/50 hover:bg-[#49733D]/5 hover:border-[#49733D]'
                      }`}
                      onClick={() => setSelectedElement(plant)}
                    >
                      <img 
                        src={plant.image} 
                        alt={plant.name}
                        className="w-12 h-12 mx-auto mb-2 object-cover rounded-lg"
                      />
                      <div className="text-sm text-[#49733D] font-medium">{plant.name}</div>
                      <div className="text-xs text-[#49733D]/70 mt-1">
                        {plant.density}
                      </div>
                      <div className="mt-1">
                        <DifficultyStars difficulty={plant.maintenance} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-[#49733D] mb-3">Teren:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.values(TERRAIN_ELEMENTS).filter(terrain => terrain.id !== 'water').map(terrain => (
                    <div
                      key={terrain.id}
                      className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all duration-200 ${
                        selectedElement?.id === terrain.id
                          ? 'border-[#49733D] bg-[#49733D]/10 shadow-lg scale-105'
                          : 'border-[#A496D9]/50 hover:bg-[#49733D]/5 hover:border-[#49733D]'
                      }`}
                      onClick={() => setSelectedElement(terrain)}
                    >
                      <img 
                        src={terrain.image} 
                        alt={terrain.name}
                        className="w-12 h-12 mx-auto mb-2 object-cover rounded-lg"
                      />
                      <div className="text-sm text-[#49733D]">{terrain.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <h2 className="text-2xl text-[#49733D]">
                {activeTab === 'design' && 'Twój Ogród'}
                {activeTab === 'plants' && 'Baza Roślin'}
                {activeTab === 'insects' && 'Baza Owadów'}
                {activeTab === 'calendar' && 'Planer Sezonowy'}
                {activeTab === 'stats' && 'Zaawansowane Statystyki'}
              </h2>
              <div className="text-sm text-[#49733D] bg-[#A496D9]/20 px-4 py-2 rounded-full">
                {gardenWidth}×{gardenHeight} • {stats.plantArea} roślin
              </div>
            </div>

            {activeTab === 'design' && (
              <div className="bg-white/60 border-2 border-[#A496D9]/30 rounded-xl p-6">
                <div className="text-sm text-[#49733D] mb-4 text-center">
                  {deleteMode 
                    ? 'Tryb usuwania: Kliknij element aby usunąć' 
                    : 'Kliknij - pojedyncza komórka • Przeciągnij - zaznacz obszar'
                  }
                </div>
                <div 
                  className="mx-auto bg-white/40 p-4 rounded-lg border border-[#A496D9]/20 shadow-inner overflow-auto max-h-[600px]"
                  style={{ 
                    display: 'grid',
                    gap: '1px',
                    gridTemplateColumns: `repeat(${gardenWidth}, minmax(0, 1fr))`,
                    width: 'fit-content'
                  }}
                  onMouseLeave={() => {
                    if (isSelectingArea) {
                      setIsSelectingArea(false);
                      setSelectionStart(null);
                      setSelectionEnd(null);
                    }
                  }}
                >
                  {garden.map((row, y) =>
                    row.map((cell, x) => {
                      const inSelection = isCellInSelection(x, y);
                      return (
                        <div
                          key={`${x}-${y}`}
                          className={`
                            w-8 h-8 border cursor-pointer transition-all duration-150
                            flex items-center justify-center
                            ${cell.type === 'empty' 
                              ? inSelection
                                ? 'bg-[#A496D9]/30 border-[#A496D9]'
                                : 'bg-white border-[#A496D9]/30 hover:bg-[#A496D9]/10'
                              : inSelection
                                ? 'bg-[#49733D]/30 border-[#49733D]'
                                : 'bg-[#49733D]/10 border-[#49733D]/30'
                            }
                            ${inSelection ? 'scale-110 z-10' : ''}
                          `}
                          onMouseDown={() => handleCellMouseDown(x, y)}
                          onMouseEnter={() => handleCellMouseEnter(x, y)}
                          onMouseUp={handleCellMouseUp}
                          onClick={() => handleSingleCellClick(x, y)}
                        >
                          {cell.type !== 'empty' && !inSelection && (
                            <img 
                              src={cell.element.image} 
                              alt={cell.element.name}
                              className="w-8 h-8 object-cover"
                            />
                          )}
                          {inSelection && selectedElement && (
                            <img 
                              src={selectedElement.image} 
                              alt={selectedElement.name}
                              className="w-8 h-8 object-cover opacity-70"
                            />
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-6 max-h-[600px] overflow-y-auto">

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Ogólne statystyki</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl text-[#49733D]">{stats.totalArea}m²</div>
                      <div className="text-sm text-[#49733D]">Powierzchnia</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-[#49733D]">{stats.utilization}%</div>
                      <div className="text-sm text-[#49733D]">Wykorzystanie</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-[#49733D]">{stats.plantArea}</div>
                      <div className="text-sm text-[#49733D]">Rośliny</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl text-[#49733D]">{stats.waterSources}</div>
                      <div className="text-sm text-[#49733D]">Źródła wody</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Bioróżnorodność</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[#49733D]">Rodzaje roślin</span>
                      <span className="text-[#49733D] font-medium">
                        {stats.biodiversity.plantTypes}/{stats.biodiversity.totalPlantTypes}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#49733D]">Rodzaje owadów</span>
                      <span className="text-[#49733D] font-medium">
                        {stats.biodiversity.insectTypes}/{stats.biodiversity.totalInsectTypes}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#49733D] h-2 rounded-full" 
                        style={{ width: `${stats.biodiversity.overallScore}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-[#49733D] text-center">
                      Ogólny wskaźnik: {stats.biodiversity.overallScore}%
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Zapotrzebowanie na wodę</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl text-[#49733D] font-medium">
                        {stats.annualWaterNeed}L
                      </div>
                      <div className="text-sm text-[#49733D]">rocznie</div>
                    </div>
                    <div className="text-sm text-[#49733D] text-center">
                      {stats.annualWaterNeed < 500 
                        ? 'Niskie zapotrzebowanie - rośliny odporne na suszę' 
                        : stats.annualWaterNeed < 1000
                        ? 'Umiarkowane zapotrzebowanie'
                        : 'Wysokie zapotrzebowanie - rozważ system nawadniania'
                      }
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Trudność pielęgnacji</h3>
                  <div className="space-y-4 text-center">
                    <div className="flex justify-center">
                      <DifficultyStars difficulty={stats.maintenance.averageDifficulty} />
                    </div>
                    <div className="text-lg text-[#49733D] font-medium">
                      {stats.maintenance.description}
                    </div>
                    <div className="text-sm text-[#49733D]">
                      Średnia trudność dla {stats.maintenance.totalElements} elementów
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Przyciąganie owadów</h3>
                  <div className="space-y-3">
                    {Object.entries(stats.insectAttraction).map(([insectId, data]) => (
                      <div key={insectId} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={data.insect.image} alt={data.insect.name} className="w-8 h-8 object-cover" />
                          <span className="text-[#49733D]">{data.insect.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-[#49733D] font-medium">{data.percentage}%</div>
                          <div className="text-xs text-[#49733D]/70">{data.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-4">Ciągłość kwitnienia</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-[#49733D]">Miesiące z kwitnieniem</span>
                      <span className="text-[#49733D] font-medium">
                        {6 - stats.bloomingContinuity.gaps}/6
                      </span>
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {stats.bloomingContinuity.continuity.map(month => (
                        <div key={month.month} className="text-center">
                          <div className={`text-xs ${month.hasBlooming ? 'text-[#49733D]' : 'text-gray-400'}`}>
                            {month.month}
                          </div>
                          <div className={`w-3 h-3 mx-auto rounded-full ${month.hasBlooming ? 'bg-[#49733D]' : 'bg-gray-300'}`}></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {stats.recommendations.length > 0 && (
                  <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                    <h3 className="text-lg text-[#49733D] mb-4">Rekomendacje</h3>
                    <div className="space-y-3">
                      {stats.recommendations.map((rec, index) => (
                        <div key={index} className={`p-3 rounded-lg border ${
                          rec.priority === 'high' ? 'border-red-300 bg-red-50' :
                          rec.priority === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                          'border-blue-300 bg-blue-50'
                        }`}>
                          <div className="text-sm text-[#49733D]">{rec.message}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'plants' && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {filteredPlants.map(plant => (
                  <div key={plant.id} className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg p-2 shadow">
                        <img 
                          src={plant.image} 
                          alt={plant.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-[#49733D] font-medium">{plant.name}</h3>
                        <p className="text-sm text-[#49733D] mt-1 italic">{plant.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#49733D] mt-3">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Kwitnienie:</span>
                            <span>{plant.blooming.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Wysokość:</span>
                            <span>{plant.height}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Gleba:</span>
                            <span>{plant.soil}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Stanowisko:</span>
                            <span>{plant.sun}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Gęstość:</span>
                            <span>{plant.density}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">Woda:</span>
                            <span>{plant.waterNeed}L/m²/rok</span>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-3">
                          <span className="text-[#49733D] font-medium">Przyciąga:</span>
                          <div className="flex gap-2">
                            {plant.insects.map(insect => (
                              <span key={insect} className="bg-[#A496D9]/20 text-[#49733D] px-3 py-1 rounded-full text-xs">
                                {insect}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="mt-3">
                          <span className="text-[#49733D] font-medium mr-2">Trudność:</span>
                          <DifficultyStars difficulty={plant.maintenance} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'insects' && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {Object.values(INSECTS_DATABASE).map(insect => (
                  <div 
                    key={insect.id}
                    className={`rounded-xl p-6 border cursor-pointer transition-all duration-300 ${
                      selectedInsect?.id === insect.id 
                        ? 'bg-[#49733D]/10 border-[#49733D] shadow-lg scale-105' 
                        : 'bg-white/60 border-[#A496D9]/20 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedInsect(insect)}
                  >
                    <div className="flex items-start gap-6">
                      <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg p-2 shadow">
                        <img 
                          src={insect.image} 
                          alt={insect.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg text-[#49733D] font-medium">{insect.name}</h3>
                        <p className="text-[#49733D] mt-2">{insect.description}</p>
                        <div className="mt-4">
                          <h4 className="text-[#49733D] font-medium mb-3">Preferowane rośliny:</h4>
                          <div className="flex flex-wrap gap-3">
                            {getPlantsForInsect(insect.id).map(plant => (
                              <div key={plant.id} className="flex items-center gap-3 bg-white px-4 py-3 rounded-lg border border-[#A496D9]/20 shadow-sm">
                                <img 
                                  src={plant.image} 
                                  alt={plant.name}
                                  className="w-8 h-8 object-cover rounded"
                                />
                                <div>
                                  <div className="text-sm text-[#49733D] font-medium">{plant.name}</div>
                                  <DifficultyStars difficulty={plant.maintenance} />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                <div className="bg-white/60 rounded-xl p-6 border border-[#A496D9]/20">
                  <h3 className="text-lg text-[#49733D] mb-6 text-center">
                    Plan kwitnienia - {seasonFilter === 'all' ? 'Cały sezon' : `Miesiąc ${seasonFilter}`}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredPlants.map(plant => (
                      <div key={plant.id} className="bg-white rounded-lg p-4 border border-[#A496D9]/20 shadow-sm">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 flex-shrink-0 bg-white rounded-lg p-1 shadow">
                            <img 
                              src={plant.image} 
                              alt={plant.name}
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                          <div>
                            <div className="text-[#49733D] font-medium">{plant.name}</div>
                            <div className="text-sm text-[#49733D]">
                              Kwitnienie: {plant.blooming.join(', ')}
                            </div>
                            <div className="text-xs text-[#49733D]/70 mt-1">
                              {plant.insects.join(', ')}
                            </div>
                            <div className="mt-2">
                              <DifficultyStars difficulty={plant.maintenance} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="xl:col-span-1 space-y-6">
            
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
              <h2 className="text-xl text-[#49733D] mb-4">Szybkie Akcje</h2>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => setGarden(createEmptyGarden(gardenWidth, gardenHeight))}
                  className="p-4 bg-[#A496D9]/10 hover:bg-[#A496D9]/20 border border-[#A496D9]/30 rounded-xl transition-all duration-200 hover:scale-105"
                >
                  <div className="text-[#49733D] text-sm text-center">Wyczyść cały ogród</div>
                </button>
                <button 
                  onClick={() => setDeleteMode(!deleteMode)}
                  className={`p-4 border rounded-xl transition-all duration-200 hover:scale-105 ${
                    deleteMode 
                      ? 'bg-red-100 border-red-300 text-red-700' 
                      : 'bg-[#A496D9]/10 hover:bg-[#A496D9]/20 border-[#A496D9]/30 text-[#49733D]'
                  }`}
                >
                  <div className="text-sm text-center">
                    {deleteMode ? 'Tryb usuwania: WŁĄCZONY' : 'Tryb usuwania'}
                  </div>
                </button>
              </div>
            </div>

 <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
  <h2 className="text-xl text-[#49733D] mb-4">Podsumowanie</h2>
  <div className="space-y-4">
    <div className="bg-white/60 p-4 rounded-xl border border-[#49733D]/20">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-[#49733D]">Ogólna ocena</div>
          <div className="text-sm text-[#49733D]">Jakość projektu</div>
        </div>
        <div className="text-3xl text-[#49733D]">{stats.overallScore}%</div>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20 text-center">
        <div className="text-xl text-[#49733D]">{stats.biodiversity.overallScore}%</div>
        <div className="text-xs text-[#49733D]">Bioróżnorodność</div>
      </div>
      <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20 text-center">
        <div className="text-xl text-[#49733D]">{stats.bloomingContinuity.score}%</div>
        <div className="text-xs text-[#49733D]">Kwitnienie</div>
      </div>
      <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20 text-center">
        <div className="text-xl text-[#49733D]">{stats.annualWaterNeed}L</div>
        <div className="text-xs text-[#49733D]">Woda/rok</div>
      </div>
      <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20 text-center">
        <div className="text-xl text-[#49733D]">{stats.utilization}%</div>
        <div className="text-xs text-[#49733D]">Wykorzystanie</div>
      </div>
    </div>

    <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20">
      <div className="text-sm text-[#49733D] font-medium mb-2">Trudność pielęgnacji:</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#49733D]">{stats.maintenance.description}</span>
        <span className="text-xs text-[#49733D] font-medium">
          {stats.maintenance.averageDifficulty}/5
        </span>
      </div>
    </div>

    <div className="bg-white/60 p-3 rounded-xl border border-[#49733D]/20">
      <div className="text-sm text-[#49733D] font-medium mb-1">Zapotrzebowanie na wodę:</div>
      <div className="text-lg text-[#49733D] text-center font-medium">
        {stats.annualWaterNeed}L/rok
      </div>
    </div>
  </div>
</div>

            {(activeTab === 'plants' || activeTab === 'calendar') && (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg p-6 border border-[#A496D9]/20">
                <h2 className="text-xl text-[#49733D] mb-4">Filtry Sezonowe</h2>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'all', label: 'Wszystkie' },
                    { id: 'IV', label: 'Kwiecień' },
                    { id: 'V', label: 'Maj' },
                    { id: 'VI', label: 'Czerwiec' },
                    { id: 'VII', label: 'Lipiec' },
                    { id: 'VIII', label: 'Sierpień' },
                    { id: 'IX', label: 'Wrzesień' }
                  ].map(month => (
                    <button
                      key={month.id}
                      onClick={() => setSeasonFilter(month.id)}
                      className={`p-3 rounded-lg text-center text-xs transition-all duration-200 ${
                        seasonFilter === month.id
                          ? 'bg-[#49733D] text-white shadow-lg scale-105'
                          : 'bg-white/60 text-[#49733D] hover:bg-white hover:scale-105'
                      }`}
                    >
                      {month.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <GardenChatbot 
              plants={PLANT_DATABASE} 
              insects={INSECTS_DATABASE}
              onPlantSelect={setSelectedElement}
            />
          </div>
        </div>
      </div>
    </div>
  );
}