"use client"

import { useState } from "react"
import {
  User,
  FileText,
  Briefcase,
  GraduationCap,
  Code,
  Globe,
  Award,
  Link,
  FolderOpen,
  Heart,
  BadgeIcon as Certificate,
  BookOpen,
  Users,
  Phone,
  Settings,
  Plus,
} from "lucide-react"
import { useResume } from "../contexts/ResumeContext"
import ManageSectionsModal from "./ManageSectionsModal"

const sectionIcons = {
  basics: User,
  summary: FileText,
  experience: Briefcase,
  education: GraduationCap,
  skills: Code,
  languages: Globe,
  awards: Award,
  profiles: Link,
  projects: FolderOpen,
  interests: Heart,
  certifications: Certificate,
  publications: BookOpen,
  volunteering: Users,
  references: Phone,
}

const sectionLabels = {
  basics: "Basics",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  awards: "Awards",
  profiles: "Profiles",
  projects: "Projects",
  interests: "Interests",
  certifications: "Certifications",
  publications: "Publications",
  volunteering: "Volunteering",
  references: "References",
}

const SectionsNavbar = ({ activeSection, onSectionChange }) => {
  const { state, hasDataInSection } = useResume()
  const [showManageModal, setShowManageModal] = useState(false)

  const visibleSections = state.sectionsOrder.filter((sectionId) => state.includedSections[sectionId])

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Sections</h2>
          <button
            onClick={() => setShowManageModal(true)}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Sections</span>
          </button>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {visibleSections.map((sectionId) => {
            const Icon = sectionIcons[sectionId]
            const hasData = hasDataInSection(sectionId)
            const isActive = activeSection === sectionId

            return (
              <button
                key={sectionId}
                onClick={() => onSectionChange(sectionId)}
                className={`flex flex-col items-center space-y-2 px-4 py-3 rounded-lg transition-all min-w-[80px] ${
                  isActive
                    ? "bg-primary-500 text-white shadow-lg"
                    : hasData
                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30"
                      : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className={`w-5 h-5 ${hasData && !isActive ? "fill-current" : ""}`} />
                <span className="text-xs font-medium whitespace-nowrap">{sectionLabels[sectionId]}</span>
                {hasData && <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-primary-500"}`} />}
              </button>
            )
          })}

          <button
            onClick={() => setShowManageModal(true)}
            className="flex flex-col items-center space-y-2 px-4 py-3 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-w-[80px] border-2 border-dashed border-gray-300 dark:border-gray-600"
          >
            <Plus className="w-5 h-5" />
            <span className="text-xs font-medium">Add Section</span>
          </button>
        </div>
      </div>

      <ManageSectionsModal isOpen={showManageModal} onClose={() => setShowManageModal(false)} />
    </>
  )
}

export default SectionsNavbar
