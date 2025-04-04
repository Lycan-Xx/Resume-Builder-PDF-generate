import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ArrowRight, Download, Eye, EyeOff } from 'lucide-react';
import Navbar from '../components/Navbar';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumePDF from '../components/ResumePDF';
import { useResume } from '../context/ResumeContext';

const sections = [
  { id: 'personal', name: 'Personal Info', color: '#544cd7', component: PersonalInfoSection },
  { id: 'education', name: 'Education', color: '#10b981', component: EducationSection },
  { id: 'experience', name: 'Experience', color: '#f59e0b', component: ExperienceSection },
  { id: 'skills', name: 'Skills', color: '#ef4444', component: SkillsSection },
  { id: 'projects', name: 'Projects', color: '#8b5cf6', component: ProjectsSection },
];

const ResumeBuilder = () => {
  const { state } = useResume();
  const [currentSection, setCurrentSection] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const CurrentSectionComponent = sections[currentSection].component;
  const isLastSection = currentSection === sections.length - 1;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navbar */}
      <Navbar />

      {/* Secondary Navbar (Progress Bar) */}
      <div className="bg-white shadow-sm py-3 fixed top-[64px] left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-800">
              {sections[currentSection].name}
            </h2>
            <span className="text-sm text-gray-500">
              Step {currentSection + 1} of {sections.length}
            </span>
          </div>
          
          <div className="flex relative">
            {sections.map((section, index) => {
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <div
                  key={section.id}
                  className="flex-1 flex flex-col items-center relative"
                >
                  {/* Connector Line */}
                  {index > 0 && (
                    <div 
                      className="absolute top-4 -left-1/2 w-full h-1 transition-all duration-500"
                      style={{ 
                        backgroundColor: isCompleted || isActive ? section.color : '#e5e7eb',
                        opacity: isCompleted ? 1 : isActive ? 0.7 : 0.3
                      }}
                    />
                  )}
                  
                  {/* Circle Step Indicator */}
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all duration-300 ${
                      isActive ? 'ring-4 ring-opacity-30' : ''
                    }`}
                    style={{ 
                      backgroundColor: isCompleted ? section.color : isActive ? section.color : '#f3f4f6',
                      color: isCompleted || isActive ? 'white' : '#6b7280',
                      ringColor: section.color
                    }}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  
                  {/* Section Name */}
                  <span 
                    className={`mt-2 text-xs font-medium transition-all duration-300 ${
                      isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-500'
                    }`}
                  >
                    {section.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-28">
        {/* Preview Toggle Button - Only visible on mobile */}
        <button
          onClick={togglePreview}
          className="md:hidden mb-4 flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
        >
          {showPreview ? (
            <>
              <EyeOff size={20} />
              <span>Hide Preview</span>
            </>
          ) : (
            <>
              <Eye size={20} />
              <span>Show Preview</span>
            </>
          )}
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Form Section */}
          <div className={`flex-1 bg-white rounded-lg shadow-lg p-6 ${showPreview ? 'hidden md:block' : 'block'}`}>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">{sections[currentSection].name}</h1>
              <div className="text-sm text-gray-500">
                Step {currentSection + 1} of {sections.length}
              </div>
            </div>

            <CurrentSectionComponent />

            <div className="mt-8 flex justify-end">
              {isLastSection ? (
                <a
                  href="#"
                  download={`${state.personalInfo.name || 'resume'}.pdf`}
                  className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Download size={20} />
                  <span>Download Resume</span>
                </a>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
                >
                  <span>Next Section</span>
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div 
            className={`flex-1 md:sticky md:top-24 h-[calc(100vh-180px)] md:h-[calc(100vh-120px)] 
              ${showPreview ? 'block' : 'hidden md:block'}`}
          >
            <div className="bg-white rounded-lg shadow-lg h-full overflow-hidden">
              <PDFViewer width="100%" height="100%" className="w-full h-full">
                <ResumePDF data={state} />
              </PDFViewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;