"use client"
import { X, Check } from "lucide-react"
import {
  HiUser,
  HiDocumentText,
  HiBriefcase,
  HiAcademicCap,
  HiCodeBracket,
  HiGlobeAlt,
  HiTrophy,
  HiLink,
  HiFolderOpen,
  HiHeart,
  HiShieldCheck,
  HiBookOpen,
  HiUserGroup,
  HiPhone,
} from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"

const sectionConfig = {
  basics: { label: "Basics", icon: HiUser, color: "orange" },
  summary: { label: "Summary", icon: HiDocumentText, color: "blue" },
  experience: { label: "Experience", icon: HiBriefcase, color: "purple" },
  education: { label: "Education", icon: HiAcademicCap, color: "green" },
  skills: { label: "Skills", icon: HiCodeBracket, color: "cyan" },
  languages: { label: "Languages", icon: HiGlobeAlt, color: "indigo" },
  awards: { label: "Awards", icon: HiTrophy, color: "yellow" },
  profiles: { label: "Profiles", icon: HiLink, color: "pink" },
  projects: { label: "Projects", icon: HiFolderOpen, color: "teal" },
  interests: { label: "Interests", icon: HiHeart, color: "red" },
  certifications: { label: "Certifications", icon: HiShieldCheck, color: "emerald" },
  publications: { label: "Publications", icon: HiBookOpen, color: "violet" },
  volunteering: { label: "Volunteering", icon: HiUserGroup, color: "lime" },
  references: { label: "References", icon: HiPhone, color: "slate" },
}

const ManageSectionsModal = ({ isOpen, onClose }) => {
  const { state, dispatch } = useResume()

  if (!isOpen) return null

  const handleToggleSection = (sectionId) => {
    dispatch({ type: "TOGGLE_SECTION", section: sectionId })
  }

  const includedCount = Object.values(state.includedSections).filter(Boolean).length

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-t-3xl sm:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-800">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white">Customize Sections</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              {includedCount} of {state.sectionsOrder.length} sections active
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Sections Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {state.sectionsOrder.map((sectionId) => {
              const config = sectionConfig[sectionId]
              const Icon = config.icon
              const isIncluded = state.includedSections[sectionId]

              return (
                <button
                  key={sectionId}
                  onClick={() => handleToggleSection(sectionId)}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-200 ${
                    isIncluded
                      ? "bg-orange-500/10 border-orange-500/50 shadow-lg shadow-orange-500/10"
                      : "bg-gray-900/50 border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {/* Check indicator */}
                  <div className={`absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                    isIncluded 
                      ? "bg-orange-500 scale-100" 
                      : "bg-gray-800 scale-0"
                  }`}>
                    <Check className="w-3 h-3 text-white" />
                  </div>

                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                    isIncluded
                      ? "bg-orange-500/20"
                      : "bg-gray-800"
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      isIncluded ? "text-orange-400" : "text-gray-500"
                    }`} />
                  </div>

                  {/* Label */}
                  <div className="text-left">
                    <p className={`text-sm font-medium ${
                      isIncluded ? "text-white" : "text-gray-400"
                    }`}>
                      {config.label}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-800 bg-[#0a0a0a]">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  )
}

export default ManageSectionsModal
