import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ArrowRight, Download } from 'lucide-react';
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

  const CurrentSectionComponent = sections[currentSection].component;
  const isLastSection = currentSection === sections.length - 1;
  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="fixed top-[64px] left-0 right-0 h-2 bg-gray-200 z-10">
        <div className="flex h-full">
          {sections.map((section, index) => {
            const sectionProgress = index < currentSection ? 100 : 
                                  index === currentSection ? 
                                  (progress - (index / sections.length * 100)) * sections.length : 0;
            return (
              <div
                key={section.id}
                className="h-full transition-all duration-300"
                style={{
                  width: `${100 / sections.length}%`,
                  backgroundColor: section.color,
                  opacity: sectionProgress > 0 ? 1 : 0.1
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 pt-16">
        <div className="flex gap-8">
          {/* Form Section */}
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
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
          <div className="flex-1 sticky top-24 h-[calc(100vh-120px)]">
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