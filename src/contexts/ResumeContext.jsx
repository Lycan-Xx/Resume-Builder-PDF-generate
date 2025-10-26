"use client"

import { createContext, useContext, useReducer, useEffect, useCallback } from "react"
import { debounce } from "lodash"

const initialState = {
  // Core sections
  basics: {
    fullName: "",
    headline: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    profilePicture: null,
  },
  summary: {
    content: "",
  },
  experience: [],
  education: [],
  skills: [],
  languages: [],
  awards: [],
  profiles: [],
  projects: [],
  interests: [],
  certifications: [],
  publications: [],
  volunteering: [],
  references: {
    items: [],
    availableUponRequest: true,
  },
  customSections: [],

  // Meta settings
  includedSections: {
    basics: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    languages: false,
    awards: false,
    profiles: false,
    projects: false,
    interests: false,
    certifications: false,
    publications: false,
    volunteering: false,
    references: false,
  },
  sectionsOrder: [
    "basics",
    "summary",
    "experience",
    "education",
    "skills",
    "languages",
    "awards",
    "profiles",
    "projects",
    "interests",
    "certifications",
    "publications",
    "volunteering",
    "references",
  ],
  selectedTemplate: "professional-red",

  // History for undo/redo
  history: {
    past: [],
    present: null,
    future: [],
  },
}

const resumeReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SECTION":
      return {
        ...state,
        [action.section]: { ...state[action.section], ...action.data },
      }

    case "ADD_ITEM":
      return {
        ...state,
        [action.section]: [...state[action.section], action.item],
      }

    case "UPDATE_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].map((item, index) =>
          index === action.index ? { ...item, ...action.data } : item,
        ),
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        [action.section]: state[action.section].filter((_, index) => index !== action.index),
      }

    case "REORDER_ITEMS":
      return {
        ...state,
        [action.section]: action.items,
      }

    case "TOGGLE_SECTION":
      return {
        ...state,
        includedSections: {
          ...state.includedSections,
          [action.section]: !state.includedSections[action.section],
        },
      }

    case "REORDER_SECTIONS":
      return {
        ...state,
        sectionsOrder: action.order,
      }

    case "SET_TEMPLATE":
      return {
        ...state,
        selectedTemplate: action.template,
      }

    case "LOAD_STATE":
      return { ...state, ...action.state }

    case "RESET_RESUME":
      return initialState

    default:
      return state
  }
}

const ResumeContext = createContext()

export const useResume = () => {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider")
  }
  return context
}

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  // Auto-save to localStorage
  const saveToStorage = useCallback(
    debounce((state) => {
      localStorage.setItem("resumeData", JSON.stringify(state))
      
      // Also update the active resume in the resumes list
      const activeResumeId = localStorage.getItem("activeResumeId")
      if (activeResumeId) {
        const savedResumes = localStorage.getItem("resumes")
        if (savedResumes) {
          try {
            const resumesList = JSON.parse(savedResumes)
            const resumeIndex = resumesList.findIndex(r => r.id === activeResumeId)
            
            if (resumeIndex !== -1) {
              resumesList[resumeIndex].data = state
              resumesList[resumeIndex].updatedAt = new Date().toISOString()
              localStorage.setItem("resumes", JSON.stringify(resumesList))
            }
          } catch (error) {
            console.error("Failed to update resume in list:", error)
          }
        }
      }
    }, 1000),
    [],
  )

  useEffect(() => {
    saveToStorage(state)
  }, [state, saveToStorage])

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("resumeData")
    if (saved) {
      try {
        const parsedState = JSON.parse(saved)
        
        // Migrate old skills format to new format if needed
        if (parsedState.skills) {
          // If skills is an array, keep it as is (for sections/SkillsSection.jsx)
          // If skills is not an array and not an object with technical/soft, convert it
          if (!Array.isArray(parsedState.skills) && 
              !parsedState.skills.technical && 
              !parsedState.skills.soft) {
            // Invalid format, reset to empty array
            parsedState.skills = []
          }
        }
        
        dispatch({ type: "LOAD_STATE", state: parsedState })
      } catch (error) {
        console.error("Failed to load saved resume data:", error)
      }
    }
  }, [])

  // Helper functions
  const hasDataInSection = useCallback(
    (sectionId) => {
      const section = state[sectionId]
      if (!section) return false

      if (Array.isArray(section)) {
        return section.length > 0
      }

      if (typeof section === "object") {
        if (sectionId === "basics") {
          return section.fullName || section.email || section.phone
        }
        if (sectionId === "summary") {
          return section.content && section.content.trim().length > 0
        }
        if (sectionId === "references") {
          return section.items.length > 0 || section.availableUponRequest
        }
        return Object.values(section).some((value) => value && value.toString().trim().length > 0)
      }

      return false
    },
    [state],
  )

  return (
    <ResumeContext.Provider
      value={{
        state,
        dispatch,
        hasDataInSection,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}
