import { useState } from 'react';
import { useResume } from '../contexts/ResumeContext';

const SkillsSection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddTechnicalSkill = (e) => {
    e.preventDefault();

    if (newTechnicalSkill.trim()) {
      dispatch({
        type: 'ADD_TECHNICAL_SKILL',
        payload: newTechnicalSkill.trim(),
      });
      setNewTechnicalSkill('');
      debouncedUpdatePreview();
    }
  };

  const handleAddSoftSkill = (e) => {
    e.preventDefault();

    if (newSoftSkill.trim()) {
      dispatch({
        type: 'ADD_SOFT_SKILL',
        payload: newSoftSkill.trim(),
      });
      setNewSoftSkill('');
      debouncedUpdatePreview();
    }
  };

  const handleRemoveTechnicalSkill = (skill) => {
    dispatch({
      type: 'REMOVE_TECHNICAL_SKILL',
      payload: skill,
    });
    debouncedUpdatePreview();
  };

  const handleRemoveSoftSkill = (skill) => {
    dispatch({
      type: 'REMOVE_SOFT_SKILL',
      payload: skill,
    });
    debouncedUpdatePreview();
  };

  return (
    <div className="space-y-8 p-1">
      <h2 className="text-2xl font-semibold text-gray-800 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-gradient-to-r before:from-[#0A9396] before:to-[#544cd7] before:-bottom-2">
        Skills
      </h2>

      {/* Technical Skills */}
      <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 flex items-center">
          <Tag size={18} className="mr-2 text-[#0A9396]" />
          Technical Skills
        </h3>

        <form onSubmit={handleAddTechnicalSkill} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              onBlur={debouncedUpdatePreview}
              placeholder="Add programming languages, tools, frameworks..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none pr-12"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              {newTechnicalSkill.length > 0 && (
                <button
                  type="button"
                  onClick={() => setNewTechnicalSkill('')}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-3 bg-[#0A9396] text-white rounded-lg hover:bg-[#088586] transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-medium">Add</span>
          </button>
        </form>

        {state.skills.technical.length === 0 ? (
          <div className="text-gray-500 text-sm italic py-2">
            No technical skills added yet. Add skills like React, JavaScript,
            Python, etc.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-2">
            {state.skills.technical.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-[#0A9396]/10 to-[#0A9396]/5 border border-[#0A9396]/20 text-gray-700 rounded-full transition-all hover:shadow-sm"
              >
                <span className="text-sm font-medium">{skill}</span>
                <button
                  onClick={() => handleRemoveTechnicalSkill(skill)}
                  className="p-1 hover:bg-[#0A9396]/20 rounded-full transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soft Skills */}
      <div className="space-y-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 flex items-center">
          <Shield size={18} className="mr-2 text-[#544cd7]" />
          Soft Skills
        </h3>

        <form onSubmit={handleAddSoftSkill} className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              onBlur={debouncedUpdatePreview}
              placeholder="Add communication, leadership, problem-solving skills..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent transition-all outline-none pr-12"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              {newSoftSkill.length > 0 && (
                <button
                  type="button"
                  onClick={() => setNewSoftSkill('')}
                  className="p-1 hover:bg-gray-100 rounded-full"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          
          </div>
          <button
            type="submit"
            className="flex items-center space-x-2 px-5 py-3 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-all shadow-sm hover:shadow transform hover:-translate-y-0.5"
          >
            <Plus size={18} strokeWidth={2.5} />
            <span className="font-medium">Add</span>
          </button>
        </form>

        {state.skills.soft.length === 0 ? (
          <div className="text-gray-500 text-sm italic py-2">
            No soft skills added yet. Add skills like Communication, Leadership,
            etc.
          </div>
        ) : (
          <div className="flex flex-wrap gap-2 pt-2">
            {state.skills.soft.map((skill, index) => (
              <div
                key={index}
                className="flex items-center space-x-1 px-3 py-2 bg-gradient-to-r from-[#544cd7]/10 to-[#544cd7]/5 border border-[#544cd7]/20 text-gray-700 rounded-full transition-all hover:shadow-sm"
              >
                <span className="text-sm font-medium">{skill}</span>
                <button
                  onClick={() => handleRemoveSoftSkill(skill)}
                  className="p-1 hover:bg-[#544cd7]/20 rounded-full transition-colors"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
