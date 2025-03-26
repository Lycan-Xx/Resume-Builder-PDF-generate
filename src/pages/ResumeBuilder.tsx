import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useResume } from '../context/ResumeContext';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumePDF from '../components/ResumePDF';
import { Download } from 'lucide-react';

const ResumeBuilder = () => {
  const { state } = useResume();
  const [showPreview, setShowPreview] = useState(false);

  const isFormValid = () => {
    return (
      state.personalInfo.name &&
      state.personalInfo.email &&
      state.education.length > 0 &&
      state.experience.length > 0 &&
      (state.skills.technical.length > 0 || state.skills.soft.length > 0)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Build Your Resume</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-8">
          <PersonalInfoSection />
          <hr className="border-gray-200" />
          <EducationSection />
          <hr className="border-gray-200" />
          <ExperienceSection />
          <hr className="border-gray-200" />
          <SkillsSection />
          <hr className="border-gray-200" />
          <ProjectsSection />
        </div>

        <div className="flex justify-end space-x-4">
          {!isFormValid() && (
            <p className="text-red-500 text-sm mt-2">
              Please fill in the required fields (Personal Info, Education, Experience, and at least one Skill)
            </p>
          )}
          <PDFDownloadLink
            document={<ResumePDF data={state} />}
            fileName={`${state.personalInfo.name.replace(/\s+/g, '_')}_resume.pdf`}
            className={`flex items-center space-x-2 px-6 py-3 bg-[#544cd7] text-white rounded-lg transition-colors ${
              !isFormValid()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-[#4038ac]'
            }`}
            onClick={(e) => {
              if (!isFormValid()) {
                e.preventDefault();
              }
            }}
          >
            <Download size={20} />
            <span>Download PDF</span>
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;