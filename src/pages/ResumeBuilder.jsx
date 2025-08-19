"use client"

import { useState } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import Navbar from "../components/Navbar"
import SectionsNavbar from "../components/SectionsNavbar"
import ResumePDF from "../components/ResumePDF"
import { useResume } from "../contexts/ResumeContext"

// Personal Info Sections
import BasicsSection from "../components/sections/BasicsSection"
import SummarySection from "../components/sections/SummarySection"
import ProfilesSection from "../components/ProfilesSection"

// Work Experience Sections
import ExperienceSection from "../components/sections/ExperienceSection"
import ProjectsSection from "../components/ProjectsSection"
import VolunteeringSection from "../components/VolunteeringSection"

// Education Sections
import EducationSection from "../components/sections/EducationSection"
import CertificationsSection from "../components/CertificationsSection"
import AwardsSection from "../components/AwardsSection"
import PublicationsSection from "../components/PublicationsSection"

// Skills Sections
import SkillsSection from "../components/sections/SkillsSection"
import LanguagesSection from "../components/sections/LanguagesSection"
import InterestsSection from "../components/InterestsSection"

// References
import ReferencesSection from "../components/ReferencesSection"

const sectionComponents = {
  // Personal Info
  basics: BasicsSection,
  summary: SummarySection,
  profiles: ProfilesSection,

  // Work Experience
  experience: ExperienceSection,
  projects: ProjectsSection,
  volunteering: VolunteeringSection,

  // Education
  education: EducationSection,
  certifications: CertificationsSection,
  awards: AwardsSection,
  publications: PublicationsSection,

  // Skills
  skills: SkillsSection,
  languages: LanguagesSection,
  interests: InterestsSection,

  // References
  references: ReferencesSection
}

const ResumeBuilder = () => {
  const { state } = useResume()
  const [activeSection, setActiveSection] = useState("basics")
  const [showPreview, setShowPreview] = useState(false)

  const ActiveSectionComponent = sectionComponents[activeSection]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Navbar */}
      <Navbar />

      {/* Sections Navigation Bar */}
      <SectionsNavbar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-160px)] lg:h-[calc(100vh-140px)]">
        {/* Left Panel - Form */}
        <div className={`${showPreview ? "hidden lg:block" : "block"} w-full lg:w-1/2 overflow-y-auto`}>
          <div className="p-4 sm:p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
              <ActiveSectionComponent />
            </div>
          </div>
        </div>

        {/* Right Panel - PDF Preview */}
        <div
          className={`${showPreview ? "block" : "hidden lg:block"} w-full lg:w-1/2 bg-white dark:bg-gray-800 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700`}
        >
          <div className="h-full p-2 sm:p-4">
            <div className="h-full bg-white rounded-lg shadow-sm overflow-hidden">
              <PDFViewer width="100%" height="100%" className="border-0">
                <ResumePDF data={{ state }} template={state.selectedTemplate} />
              </PDFViewer>
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
