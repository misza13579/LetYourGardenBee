import React from 'react';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { href: 'strona-glowna', label: 'Strona Główna' },
    { href: 'projekt', label: 'Ogrodowy Planer' },
    { href: 'wyszukiwarka', label: 'Wyszukiwarka Roślin' },
    { href: 'wtyczka', label: 'Pobierz Wtyczkę' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-[rgba(164,150,217,0.9)] py-3 z-50 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-center max-w-[1200px] mx-auto px-8">
        <div className="nav-logo mr-12 absolute left-5">
          <img 
            src="/logo.gif" 
            alt="Let Your Garden Bee Logo" 
            className="h-20 w-auto transition-transform duration-300 hover:scale-105"
          />
        </div>
        <ul className="flex justify-center list-none gap-12 flex-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="text-white no-underline font-semibold text-lg py-2 px-6 rounded-3xl transition-all duration-300 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.25)] hover:-translate-y-0.5"
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;