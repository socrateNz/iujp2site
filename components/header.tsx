import { Button } from "@/components/ui/button";
import React from "react";

const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <div className="flex items-center">
        <div className="mr-2 text-[#1B2A4A] text-3xl font-serif font-bold">
          <span className="text-[#D4AF37]">IUJP</span>II
        </div>
        <div className="hidden md:block text-sm text-gray-600 font-serif">Institut Universitaire Jean-Paul II</div>
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        {['accueil', 'a-propos', 'formations', 'vie-etudiante', 'blog', 'contact'].map((tab) => (
          <a 
            key={tab}
            href={`#${tab}`} 
            // onClick={() => setActiveTab(tab)}
            className={`text-sm font-medium hover:text-[#D4AF37] transition-colors cursor-pointer`}
          >
            {tab.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </a>
        ))}
      </nav>
      <Button variant="outline" className="hidden md:flex items-center gap-2 border-[#D4AF37] text-[#1B2A4A] hover:bg-[#D4AF37] hover:text-white !rounded-button whitespace-nowrap">
        <i className="fas fa-user-graduate"></i>
        Espace étudiant
      </Button>
      <button className="md:hidden text-[#1B2A4A] cursor-pointer">
        <i className="fas fa-bars text-xl"></i>
      </button>
    </div>
  </header>
);

export default Header;