import React from 'react';
import PlantGrid from './PlantGrid';

const ProjectDescription = () => {
  return (
    <div className="podzial grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 w-full">
      <div className="opis-projektu bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 flex flex-col w-full">
        <h2 className="text-[#49733D] mb-4 text-2xl text-center border-b-2 border-[#F2E9BB] pb-3">
          Opis Projektu
        </h2>
        <p className="mb-4 text-lg leading-relaxed text-justify">
          Z każdym dniem świat traci coś bezcennego – brzęczenie pszczół i taniec motyli, które od wieków napędzają życie na naszej planecie. W ciągu ostatnich 50 lat populacja zapylaczy zmalała aż o 40%, a to oznacza poważne zagrożenie dla bioróżnorodności, plonów i zdrowia ekosystemów. Bez tych małych bohaterów nasze ogrody i łąki powoli cichną, tracąc kolory i zapachy, które dotąd podziwiamy, chociażby obdarowując bliskie nam osoby bukietem.
        </p>
        <p className="text-lg leading-relaxed text-justify">
          Nasz projekt powstał, aby odwrócić sytuację – stworzyć bazę roślin, które są prawdziwym magnesem dla pszczół, trzmieli i motyli, przywracając życie tam, gdzie zanika. „Let Your Garden Bee The One!” to nie tylko katalog roślin, ale także miejsce inspiracji i wiedzy, gdzie każdy może dowiedzieć się, jak zadbać o zapylaczy. To zaproszenie do stworzenia własnego, tętniącego życiem ogrodu – miejsca, gdzie każdy kwiat staje się istotny. Razem możemy odbudować tę symfonię życia – kwiat po kwiecie, brzęczenie po brzęczeniu – i dać naszej planecie szansę na lepsze jutro.
        </p>
      </div>

      <div className="odkryj-rosliny bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-white/30 flex flex-col w-full max-h-[600px] overflow-y-auto">
        <PlantGrid />
      </div>
    </div>
  );
};

export default ProjectDescription;