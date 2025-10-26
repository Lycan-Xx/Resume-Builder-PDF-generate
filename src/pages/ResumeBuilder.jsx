"use client";

import { useState, memo, useMemo, useEffect } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { useResume } from "../contexts/ResumeContext";
import { HiDocumentText, HiEye } from "react-icons/hi2";
import PreviewModal from "../components/modals/PreviewModal";

// Layout Components
import Navbar from "../components/layout/Navbar";
import SectionsNavbar from "../components/layout/SectionsNavbar";

// PDF Components
import ResumePDF from "../components/pdf/ResumePDF";
import TemplateSelector from "../components/pdf/TemplateSelector";

// Section Components
import BasicsSection from "../components/sections/BasicsSection";
import SummarySection from "../components/sections/SummarySection";
import ProfilesSection from "../components/sections/ProfilesSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import VolunteeringSection from "../components/sections/VolunteeringSection";
import EducationSection from "../components/sections/EducationSection";
import CertificationsSection from "../components/sections/CertificationsSection";
import AwardsSection from "../components/sections/AwardsSection";
import PublicationsSection from "../components/sections/PublicationsSection";
import SkillsSection from "../components/sections/SkillsSection";
import LanguagesSection from "../components/sections/LanguagesSection";
import InterestsSection from "../components/sections/InterestsSection";
import ReferencesSection from "../components/sections/ReferencesSection";

const sectionComponents = {
  basics: BasicsSection,
  summary: SummarySection,
  profiles: ProfilesSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  volunteering: VolunteeringSection,
  education: EducationSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  publications: PublicationsSection,
  skills: SkillsSection,
  languages: LanguagesSection,
  interests: InterestsSection,
  references: ReferencesSection,
};

// Memoized PDF Viewer with deep comparison to prevent unnecessary re-renders
const MemoizedPDFViewer = memo(({ state, templateId }) => {
  const pdfData = useMemo(() => ({ state }), [state]);

  return (
    <PDFViewer width="100%" height="100%" className="w-full h-full" showToolbar={false}>
      <ResumePDF data={pdfData} templateId={templateId} />
    </PDFViewer>
  );
}, (prevProps, nextProps) => {
  // Custom comparison: only re-render if state or template actually changed
  return JSON.stringify(prevProps.state) === JSON.stringify(nextProps.state) 
    && prevProps.templateId === nextProps.templateId;
});

const ResumeBuilder = () => {
  const { state } = useResume();
  const [activeSection, setActiveSection] = useState("basics");
  const [activeTab, setActiveTab] = useState("content");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  
  // Debounced state for PDF rendering (updates 800ms after last change)
  const [debouncedState, setDebouncedState] = useState(state);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedState(state);
    }, 800); // 800ms debounce - feels instant but reduces renders significantly

    return () => clearTimeout(timer);
  }, [state]);

  const ActiveSectionComponent = sectionComponents[activeSection];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <SectionsNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Tab switcher */}
      <div className="border-b border-gray-800 bg-[#111111]">
        <div className="flex gap-1 px-6">
          <button
            onClick={() => setActiveTab("content")}
            className={`py-3 px-5 font-medium transition-all relative ${
              activeTab === "content"
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              <HiDocumentText className="w-4 h-4" />
              Content
            </span>
            {activeTab === "content" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("template")}
            className={`py-3 px-5 font-medium transition-all relative ${
              activeTab === "template"
                ? "text-white"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            <span className="flex items-center gap-2">
              Template
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-semibold">
                New
              </span>
            </span>
            {activeTab === "template" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-180px)] md:h-[calc(100vh-200px)]">
        {/* Left Panel - Always visible on mobile, half width on desktop */}
        <div className="w-full lg:w-1/2 overflow-y-auto bg-[#0a0a0a]">
          <div className="p-4 md:p-6">
            <div className="bg-[#111111] rounded-xl border border-gray-800 p-4 md:p-6">
              {activeTab === "content" ? (
                <ActiveSectionComponent />
              ) : (
                <TemplateSelector />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - PDF Preview (Desktop only) */}
        <div className="hidden lg:block w-1/2 bg-[#0a0a0a] border-l border-gray-800">
          <div className="h-full p-4 md:p-6">
            <div className="h-full bg-[#111111] rounded-xl overflow-hidden border border-gray-800 relative">
              {/* Loading indicator when debouncing */}
              {JSON.stringify(state) !== JSON.stringify(debouncedState) && (
                <div className="absolute top-4 right-4 z-10 bg-orange-500/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  Updating...
                </div>
              )}
              <MemoizedPDFViewer state={debouncedState} templateId={state.selectedTemplate} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Button - Opens Modal */}
      <button
        onClick={() => {
          setIsPreviewLoading(true);
          setTimeout(() => {
            setShowPreviewModal(true);
            setIsPreviewLoading(false);
          }, 300);
        }}
        disabled={isPreviewLoading}
        className="lg:hidden fixed bottom-6 right-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-4 rounded-full shadow-xl transition-all duration-300 z-50 flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
        aria-label="Preview Resume"
      >
        {isPreviewLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span className="font-medium text-sm">Loading...</span>
          </>
        ) : (
          <>
            <HiEye className="w-5 h-5" />
            <span className="font-medium text-sm">Preview</span>
          </>
        )}
      </button>

      {/* Preview Modal for Mobile */}
      <PreviewModal 
        isOpen={showPreviewModal} 
        onClose={() => setShowPreviewModal(false)} 
      />
    </div>
  );
};

export default ResumeBuilder;
