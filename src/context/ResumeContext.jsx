import React, { createContext, useContext, useReducer } from 'react';

const initialState = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
    links: {},
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
  },
  projects: [],
};

const resumeReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    
    // Education Actions
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, action.payload],
      };
    case 'UPDATE_EDUCATION':
      return { 
        ...state,
        education: state.education.map((edu, index) => 
          index === action.payload.index 
            ? { ...edu, ...action.payload.data }
            : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, index) => index !== action.payload),
      };
    
    // Experience Actions
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [...state.experience, action.payload],
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp, index) => 
          index === action.payload.index 
            ? { ...exp, [action.payload.field]: action.payload.value }
            : exp
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((_, index) => index !== action.payload),
      };
    case 'ADD_RESPONSIBILITY':
      return {
        ...state,
        experience: state.experience.map((exp, index) => 
          index === action.payload.expIndex
            ? { ...exp, responsibilities: [...exp.responsibilities, ''] }
            : exp
        ),
      };
    case 'UPDATE_RESPONSIBILITY':
      return {
        ...state,
        experience: state.experience.map((exp, expIndex) => 
          expIndex === action.payload.expIndex
            ? {
                ...exp,
                responsibilities: exp.responsibilities.map((resp, respIndex) => 
                  respIndex === action.payload.respIndex
                    ? action.payload.value
                    : resp
                )
              }
            : exp
        ),
      };
    case 'REMOVE_RESPONSIBILITY':
      return {
        ...state,
        experience: state.experience.map((exp, expIndex) => 
          expIndex === action.payload.expIndex
            ? {
                ...exp,
                responsibilities: exp.responsibilities.filter(
                  (_, respIndex) => respIndex !== action.payload.respIndex
                )
              }
            : exp
        ),
      };
    
    // Skills Actions
    case 'UPDATE_SKILLS':
      return {
        ...state,
        skills: { ...state.skills, ...action.payload },
      };
    case 'ADD_TECHNICAL_SKILL':
      return {
        ...state,
        skills: {
          ...state.skills,
          technical: [...state.skills.technical, action.payload],
        },
      };
    case 'ADD_SOFT_SKILL':
      return {
        ...state,
        skills: {
          ...state.skills,
          soft: [...state.skills.soft, action.payload],
        },
      };
    case 'REMOVE_TECHNICAL_SKILL':
      return {
        ...state,
        skills: {
          ...state.skills,
          technical: state.skills.technical.filter(skill => skill !== action.payload),
        },
      };
    case 'REMOVE_SOFT_SKILL':
      return {
        ...state,
        skills: {
          ...state.skills,
          soft: state.skills.soft.filter(skill => skill !== action.payload),
        },
      };
    
    // Projects Actions
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((project, index) => 
          index === action.payload.index 
            ? { ...project, ...action.payload.data }
            : project
        ),
      };
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, index) => index !== action.payload),
      };

    case 'RESET_FORM':
      return {
        personalInfo: {
          name: '',
          email: '',
          phone: '',
          location: '',
          links: {},
        },
        education: [],
        experience: [],
        skills: {
          technical: [],
          soft: [],
        },
        projects: [],
      };
    
    default:
      return state;
  }
};

const ResumeContext = createContext(null);

export const ResumeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};