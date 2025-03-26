import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ExperienceSection = () => {
  const { state, dispatch } = useResume();

  const handleAddExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        responsibilities: [''],
      },
    });
  };

  const handleRemoveExperience = (index) => {
    dispatch({
      type: 'REMOVE_EXPERIENCE',
      payload: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: {
        index,
        field,
        value,
      },
    });
  };

  const handleAddResponsibility = (expIndex) => {
    dispatch({
      type: 'ADD_RESPONSIBILITY',
      payload: {
        expIndex,
      },
    });
  };

  const handleResponsibilityChange = (expIndex, respIndex, value) => {
    dispatch({
      type: 'UPDATE_RESPONSIBILITY',
      payload: {
        expIndex,
        respIndex,
        value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
        >
          <Plus size={20} />
          <span>Add Experience</span>
        </button>
      </div>
      {state.experience.map((exp, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company"
              value={exp.company}
              onChange={(e) => handleInputChange(index, 'company', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Position"
              value={exp.position}
              onChange={(e) => handleInputChange(index, 'position', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="date"
              placeholder="Start Date"
              value={exp.startDate}
              onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="date"
              placeholder="End Date"
              value={exp.endDate}
              onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Responsibilities</label>
            {exp.responsibilities.map((resp, respIndex) => (
              <input
                key={respIndex}
                type="text"
                placeholder="Add responsibility"
                value={resp}
                onChange={(e) => handleResponsibilityChange(index, respIndex, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
              />
            ))}
            <button
              onClick={() => handleAddResponsibility(index)}
              className="text-[#544cd7] text-sm hover:underline"
            >
              + Add another responsibility
            </button>
          </div>
          <button
            onClick={() => handleRemoveExperience(index)}
            className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
            <span>Remove Experience</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;