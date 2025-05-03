import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { ArrowRight, Download, Eye, EyeOff, UserCircle2, GraduationCap, Briefcase, Code2, FolderGit2 } from 'lucide-react';
import Navbar from '../components/Navbar';
import ProgressNavbar from '../components/ProgressNavbar';
import PersonalInfoSection from '../components/PersonalInfoSection';
import EducationSection from '../components/EducationSection';
import ExperienceSection from '../components/ExperienceSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumePDF from '../components/ResumePDF';
import { useResume } from '../context/ResumeContext';

const sections = [
  {
	id: 'personal',
	name: 'Personal Info',
	color: '#544cd7',
	component: PersonalInfoSection,
	icon: <UserCircle2 size={24} />,
  },

  {
	id: 'education',
	name: 'Education',
	color: '#10b981',
	component: EducationSection,
	icon: <GraduationCap size={24} />,
  },

  {
	id: 'experience',
	name: 'Experience',
	color: '#f59e0b',
	component: ExperienceSection,
	icon: <Briefcase size={24} />,
  },

  { id: 'skills',
	name: 'Skills',
	color: '#ef4444',
	component: SkillsSection,
	icon: <Code2 size={24} />,

  },

  {
	id: 'projects',
	name: 'Projects',
	color: '#8b5cf6',
	component: ProjectsSection,
	icon: <FolderGit2 size={24} />,
  },
];

const ResumeBuilder = () => {
  const { previewState, dispatch } = useResume();
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

  const resetForm = () => {
	dispatch({ type: 'RESET_FORM' });
  };

  return (
	<div className="min-h-screen bg-gray-50">
	  {/* Main Navbar */}
	  <Navbar />

	  {/* Progress Navigation Bar */}
	  <ProgressNavbar
		sections={sections}
		currentSection={currentSection}
		setCurrentSection={setCurrentSection}
		resetForm={resetForm}
	  />

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
		  <div
			className={`flex-1 bg-white rounded-lg shadow-lg p-6 ${
			  showPreview ? 'hidden md:block' : 'block'
			}`}
		  >
			<CurrentSectionComponent />

			<div className="mt-8 flex justify-end">
			  {isLastSection ? (
				<a
				  href="#"
				  download={`${previewState.personalInfo.name || 'resume'}.pdf`}
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
				<ResumePDF data={previewState} />
			  </PDFViewer>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  );
};

export default ResumeBuilder;