"use client"

import { useState, memo, useMemo } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import { useResume } from "../contexts/ResumeContext"

// Layout Components
import Navbar from "../components/layout/Navbar"
import SectionsNavbar from "../components/layout/SectionsNavbar"

// PDF Components
import ResumePDF from "../components/pdf/ResumePDF"
import TemplateSelector from "../components/pdf/TemplateSelector"

// Section Components
import BasicsSection from "../components/sections/BasicsSection"
import SummarySection from "../components/sections/SummarySection"
import ProfilesSection from "../components/sections/ProfilesSection"
import ExperienceSection from "../components/sections/ExperienceSection"
import ProjectsSection from "../components/sections/ProjectsSection"
import VolunteeringSection from "../components/sections/VolunteeringSection"
import EducationSection from "../components/sections/EducationSection"
import CertificationsSection from "../components/sections/CertificationsSection"
import AwardsSection from "../components/sections/AwardsSection"
import PublicationsSection from "../components/sections/PublicationsSection"
import SkillsSection from "../components/sections/SkillsSection"
import LanguagesSection from "../components/sections/LanguagesSection"
import InterestsSection from "../components/sections/InterestsSection"
import ReferencesSection from "../components/sections/ReferencesSection"

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
  references: ReferencesSection
}

// Memoized PDF Viewer to prevent re-rendering on every keystroke
const MemoizedPDFViewer = memo(({ state }) => {
  const pdfData = useMemo(() => ({ state }), [state])

  return (
    <PDFViewer width="100%" height="100%" className="w-full h-full">
      <ResumePDF data={pdfData} />
    </PDFViewer>
  )
})

const ResumeBuilder = () => {
  const { state } = useResume()
  const [activeSection, setActiveSection] = useState("basics")
  const [activeTab, setActiveTab] = useState("content")
  const [showPreview, setShowPreview] = useState(false)

  const ActiveSectionComponent = sectionComponents[activeSection]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <SectionsNavbar activeSection={activeSection} onSectionChange={setActiveSection} />
     
      {/* Tab switcher */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex gap-4 px-6">
          <button
            onClick={() => setActiveTab('content')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'content'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setActiveTab('template')}
            className={`py-3 px-4 border-b-2 font-medium transition-colors ${
              activeTab === 'template'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            <span className="flex items-center gap-2">
              Template
              <span className="text-xs bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 px-2 py-0.5 rounded">
                New
              </span>
            </span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row h-[calc(100vh-200px)]">
        {/* Left Panel */}
        <div className={`${showPreview ? "hidden lg:block" : "block"} w-full lg:w-1/2 overflow-y-auto`}>
          <div className="p-4 sm:p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              {activeTab === 'content' ? (
                <ActiveSectionComponent />
              ) : (
                <TemplateSelector />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - PDF Preview */}
        <div className={`${showPreview ? "block" : "hidden lg:block"} w-full lg:w-1/2 bg-white dark:bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700`}>
          <div className="h-full p-2 sm:p-4">
            <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
              <MemoizedPDFViewer state={state} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Preview Toggle */}
      <button
        onClick={() => setShowPreview(!showPreview)}
        className="lg:hidden fixed bottom-4 right-4 bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-colors z-50 min-h-[48px] min-w-[48px] flex items-center justify-center"
        aria-label={showPreview ? "Switch to form view" : "Switch to preview"}
      >
        <span className="text-lg">{showPreview ? "📝" : "👁️"}</span>
      </button>
    </div>
  )
}

export default ResumeBuilder
