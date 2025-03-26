import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const EducationSection = () => {
  const { state, dispatch } = useResume();

  const handleAddEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: '',
        degree: '',
        major: '',
        graduationDate: '',
        gpa: '',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        <button
          onClick={handleAddEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
        >
          <Plus size={20} />
          <span>Add Education</span>
        </button>
      </div>
      
      {state.education.map((edu, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Institution"
              value={edu.institution}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Major"
              value={edu.major}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Graduation Date"
              value={edu.graduationDate}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="GPA (Optional)"
              value={edu.gpa}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <button
              className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;