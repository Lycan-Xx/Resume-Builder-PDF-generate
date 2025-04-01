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

  const handleRemoveEducation = (index) => {
    dispatch({
      type: 'REMOVE_EDUCATION',
      payload: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: {
        index,
        data: { [field]: value }
      }
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
              onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Major"
              value={edu.major}
              onChange={(e) => handleInputChange(index, 'major', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Graduation Date"
              value={edu.graduationDate}
              onChange={(e) => handleInputChange(index, 'graduationDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="GPA (Optional)"
              value={edu.gpa}
              onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
          </div>

          <button
            onClick={() => handleRemoveEducation(index)}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
            <span>Remove Education</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;