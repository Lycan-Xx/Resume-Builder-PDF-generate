import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Download } from 'lucide-react';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumePDF from '../components/ResumePDF';
import { useResume } from '../context/ResumeContext';

const ResumeBuilder = () => {
  const { state } = useResume();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Resume Builder</h1>
          <PDFDownloadLink
            document={<ResumePDF data={state} />}
            fileName={`${state.personalInfo.name || 'resume'}.pdf`}
            className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
          >
            {({ loading }) => (
              <>
                <Download size={20} />
                <span>{loading ? 'Preparing...' : 'Download PDF'}</span>
              </>
            )}
          </PDFDownloadLink>
        </div>

        <div className="space-y-8">
          <PersonalInfoSection />
          <EducationSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;