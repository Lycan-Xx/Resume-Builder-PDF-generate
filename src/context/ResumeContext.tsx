import React, { createContext, useContext, useReducer } from 'react';

interface ResumeState {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    links: {
      linkedin?: string;
      github?: string;
    };
  };
  education: Array<{
    institution: string;
    degree: string;
    major: string;
    graduationDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }>;
  skills: {
    technical: string[];
    soft: string[];
  };
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    links: string[];
  }>;
}

const initialState: ResumeState = {
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

type Action =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<ResumeState['personalInfo']> }
  | { type: 'ADD_EDUCATION'; payload: ResumeState['education'][0] }
  | { type: 'UPDATE_EDUCATION'; payload: { index: number; data: Partial<ResumeState['education'][0]> } }
  | { type: 'REMOVE_EDUCATION'; payload: number }
  | { type: 'ADD_EXPERIENCE'; payload: ResumeState['experience'][0] }
  | { type: 'UPDATE_EXPERIENCE'; payload: { index: number; field: keyof ResumeState['experience'][0]; value: string } }
  | { type: 'REMOVE_EXPERIENCE'; payload: number }
  | { type: 'ADD_RESPONSIBILITY'; payload: { expIndex: number } }
  | { type: 'UPDATE_RESPONSIBILITY'; payload: { expIndex: number; respIndex: number; value: string } }
  | { type: 'REMOVE_RESPONSIBILITY'; payload: { expIndex: number; respIndex: number } }
  | { type: 'UPDATE_SKILLS'; payload: Partial<ResumeState['skills']> }
  | { type: 'ADD_TECHNICAL_SKILL'; payload: string }
  | { type: 'ADD_SOFT_SKILL'; payload: string }
  | { type: 'REMOVE_TECHNICAL_SKILL'; payload: string }
  | { type: 'REMOVE_SOFT_SKILL'; payload: string }
  | { type: 'ADD_PROJECT'; payload: ResumeState['projects'][0] }
  | { type: 'UPDATE_PROJECT'; payload: { index: number; data: Partial<ResumeState['projects'][0]> } }
  | { type: 'REMOVE_PROJECT'; payload: number };

const resumeReducer = (state: ResumeState, action: Action): ResumeState => {
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
    
    default:
      return state;
  }
};

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(resumeReducer, initialState);
  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  );
};

const ResumeContext = createContext<{
  state: ResumeState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};