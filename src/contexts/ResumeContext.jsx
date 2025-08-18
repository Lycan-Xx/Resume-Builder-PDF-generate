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
  selectedTemplate: "modern",

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

    case "UNDO":
      if (state.history.past.length === 0) return state
      const previous = state.history.past[state.history.past.length - 1]
      const newPast = state.history.past.slice(0, state.history.past.length - 1)
      return {
        ...previous,
        history: {
          past: newPast,
          present: previous,
          future: [state, ...state.history.future],
        },
      }

    case "REDO":
      if (state.history.future.length === 0) return state
      const next = state.history.future[0]
      const newFuture = state.history.future.slice(1)
      return {
        ...next,
        history: {
          past: [...state.history.past, state],
          present: next,
          future: newFuture,
        },
      }

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

  const addHistoryState = useCallback(
    (newState) => {
      return {
        ...newState,
        history: {
          past: [...state.history.past, state].slice(-50), // Keep last 50 states
          present: newState,
          future: [],
        },
      }
    },
    [state],
  )

  return (
    <ResumeContext.Provider
      value={{
        state,
        dispatch,
        hasDataInSection,
        addHistoryState,
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}
