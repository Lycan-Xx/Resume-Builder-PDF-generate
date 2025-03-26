import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileText } from 'lucide-react';
import HomePage from './pages/HomePage';
import ResumeBuilder from './pages/ResumeBuilder';
import { ResumeProvider } from './context/ResumeContext';

function App() {
  return (
    <ResumeProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <nav className="bg-[#544cd7] text-white p-4">
            <div className="container mx-auto flex items-center justify-between">
              <a href="/" className="flex items-center space-x-2 text-xl font-bold">
                <FileText size={24} />
                <span>ResumeForge</span>
              </a>
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<ResumeBuilder />} />
          </Routes>
        </div>
      </Router>
    </ResumeProvider>
  );
}

export default App;