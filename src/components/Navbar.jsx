import React from 'react';
import { FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-[#544cd7] text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2 text-xl font-bold">
          <FileText size={24} />
          <span>ResumeForge</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;