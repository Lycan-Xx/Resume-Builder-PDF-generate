import React from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ExperienceSection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();

  const handleAddExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        responsibilities: [''],
      },
    });
    debouncedUpdatePreview();
  };

  const handleRemoveExperience = (index) => {
    dispatch({
      type: 'REMOVE_EXPERIENCE',
      payload: index,
    });
    debouncedUpdatePreview();
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { index, field, value },
    });
  };

  const handleAddResponsibility = (expIndex) => {
    dispatch({
      type: 'ADD_RESPONSIBILITY',
      payload: { expIndex },
    });
    debouncedUpdatePreview();
  };

  const handleUpdateResponsibility = (expIndex, respIndex, value) => {
    dispatch({
      type: 'UPDATE_RESPONSIBILITY',
      payload: { expIndex, respIndex, value },
    });
  };

  const handleRemoveResponsibility = (expIndex, respIndex) => {
    dispatch({
      type: 'REMOVE_RESPONSIBILITY',
      payload: { expIndex, respIndex },
    });
    debouncedUpdatePreview();
  };

  return (
    <div className="space-y-6 p-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-gradient-to-r before:from-[#0A9396] before:to-[#544cd7] before:-bottom-2">
          Experience
        </h2>
        <button
          onClick={handleAddExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-[#0A9396] text-white rounded-lg hover:bg-[#088586] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span className="font-medium">Add Experience</span>
        </button>
      </div>

      {state.experience.length === 0 && (
        <div className="bg-gray-50/70 p-8 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
          <div className="text-gray-500 mb-2">No experience added yet</div>
          <button
            onClick={handleAddExperience}
            className="flex items-center space-x-2 px-4 py-2 text-[#0A9396] hover:bg-[#0A9396]/10 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add your first experience</span>
          </button>
        </div>
      )}

      {state.experience.map((exp, expIndex) => (
        <div
          key={expIndex}
          className="bg-white p-6 rounded-lg space-y-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Company
              </label>
              <input
                type="text"
                placeholder="Company name"
                value={exp.company}
                onChange={(e) =>
                  handleInputChange(expIndex, 'company', e.target.value)
                }
                onBlur={debouncedUpdatePreview}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Position
              </label>
              <input
                type="text"
                placeholder="Your title or role"
                value={exp.position}
                onChange={(e) =>
                  handleInputChange(expIndex, 'position', e.target.value)
                }
                onBlur={debouncedUpdatePreview}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">
                Location
              </label>
              <input
                type="text"
                placeholder="City, Country or Remote"
                value={exp.location}
                onChange={(e) =>
                  handleInputChange(expIndex, 'location', e.target.value)
                }
                onBlur={debouncedUpdatePreview}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  Start Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/YYYY"
                    value={exp.startDate}
                    onChange={(e) =>
                      handleInputChange(expIndex, 'startDate', e.target.value)
                    }
                    onBlur={debouncedUpdatePreview}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-600">
                  End Date
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="MM/YYYY or Present"
                    value={exp.endDate}
                    onChange={(e) =>
                      handleInputChange(expIndex, 'endDate', e.target.value)
                    }
                    onBlur={debouncedUpdatePreview}
                    className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
                  />
                  <Calendar
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-700 flex items-center">
                <span className="h-4 w-1 bg-[#544cd7] rounded-full mr-2 inline-block"></span>
                Responsibilities
              </h3>
              <button
                onClick={() => handleAddResponsibility(expIndex)}
                className="flex items-center space-x-1 px-3 py-1 text-[#544cd7] hover:bg-[#544cd7]/10 rounded-lg transition-colors"
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>Add</span>
              </button>
            </div>

            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="flex items-start space-x-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) =>
                    handleUpdateResponsibility(
                      expIndex,
                      respIndex,
                      e.target.value
                    )
                  }
                  onBlur={debouncedUpdatePreview}
                  placeholder="Describe your responsibility..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
                />
                <button
                  onClick={() =>
                    handleRemoveResponsibility(expIndex, respIndex)
                  }
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  aria-label="Remove responsibility"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <button
              onClick={() => handleRemoveExperience(expIndex)}
              className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <Trash2 size={18} />
              <span>Remove Experience</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceSection;