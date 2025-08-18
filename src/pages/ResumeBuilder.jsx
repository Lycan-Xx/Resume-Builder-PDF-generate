"use client"

import { useState } from "react"
import { PDFViewer } from "@react-pdf/renderer"
import Navbar from "../components/Navbar"
import SectionsNavbar from "../components/SectionsNavbar"
import BasicsSection from "../components/sections/BasicsSection"
import SummarySection from "../components/sections/SummarySection"
import ExperienceSection from "../components/sections/ExperienceSection"
import EducationSection from "../components/sections/EducationSection"
import SkillsSection from "../components/sections/SkillsSection"
import LanguagesSection from "../components/sections/LanguagesSection"
import ResumePDF from "../components/ResumePDF"
import { useResume } from "../contexts/ResumeContext"

const sectionComponents = {
  basics: BasicsSection,
  summary: SummarySection,
  experience: ExperienceSection,
  education: EducationSection,
  skills: SkillsSection,
  languages: LanguagesSection,
  // Add more sections as they're created
  awards: () => <div className="p-8 text-center text-gray-500">Awards section coming soon...</div>,
  profiles: () => <div className="p-8 text-center text-gray-500">Profiles section coming soon...</div>,
  projects: () => <div className="p-8 text-center text-gray-500">Projects section coming soon...</div>,
  interests: () => <div className="p-8 text-center text-gray-500">Interests section coming soon...</div>,
  certifications: () => <div className="p-8 text-center text-gray-500">Certifications section coming soon...</div>,
  publications: () => <div className="p-8 text-center text-gray-500">Publications section coming soon...</div>,
  volunteering: () => <div className="p-8 text-center text-gray-500">Volunteering section coming soon...</div>,
  references: () => <div className="p-8 text-center text-gray-500">References section coming soon...</div>,
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

      <div className="flex h-[calc(100vh-140px)]">
        {/* Left Panel - Form */}
        <div className={`${showPreview ? "hidden lg:block" : "block"} w-full lg:w-1/2 overflow-y-auto`}>
          <div className="p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <ActiveSectionComponent />
            </div>
          </div>
        </div>

        {/* Right Panel - PDF Preview */}
        <div
          className={`${showPreview ? "block" : "hidden lg:block"} w-full lg:w-1/2 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700`}
        >
          <div className="h-full p-4">
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
        className="lg:hidden fixed bottom-6 right-6 bg-primary-500 hover:bg-primary-600 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        {showPreview ? "📝" : "👁️"}
      </button>
    </div>
  )
}

export default ResumeBuilder
