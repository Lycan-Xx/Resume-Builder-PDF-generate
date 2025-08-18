"use client"
import { X, Eye, EyeOff, GripVertical } from "lucide-react"
import { useResume } from "../contexts/ResumeContext"

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

const ManageSectionsModal = ({ isOpen, onClose }) => {
  const { state, dispatch } = useResume()

  if (!isOpen) return null

  const handleToggleSection = (sectionId) => {
    dispatch({ type: "TOGGLE_SECTION", section: sectionId })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Sections</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-96 overflow-y-auto">
          {state.sectionsOrder.map((sectionId) => (
            <div
              key={sectionId}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{sectionLabels[sectionId]}</span>
              </div>

              <button
                onClick={() => handleToggleSection(sectionId)}
                className={`p-2 rounded-lg transition-colors ${
                  state.includedSections[sectionId]
                    ? "text-primary-600 hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-900/20"
                    : "text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {state.includedSections[sectionId] ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageSectionsModal
