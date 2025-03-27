import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const SkillsSection = () => {
  const { state, dispatch } = useResume();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddTechnicalSkill = (e) => {
    e.preventDefault();
    if (newTechnicalSkill.trim()) {
      dispatch({
        type: 'ADD_TECHNICAL_SKILL',
        payload: newTechnicalSkill.trim()
      });
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = (e) => {
    e.preventDefault();
    if (newSoftSkill.trim()) {
      dispatch({
        type: 'ADD_SOFT_SKILL',
        payload: newSoftSkill.trim()
      });
      setNewSoftSkill('');
    }
  };

  const handleRemoveTechnicalSkill = (skill) => {
    dispatch({
      type: 'REMOVE_TECHNICAL_SKILL',
      payload: skill
    });
  };

  const handleRemoveSoftSkill = (skill) => {
    dispatch({
      type: 'REMOVE_SOFT_SKILL',
      payload: skill
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>

      {/* Technical Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Technical Skills</h3>
        <form onSubmit={handleAddTechnicalSkill} className="flex gap-2">
          <input
            type="text"
            value={newTechnicalSkill}
            onChange={(e) => setNewTechnicalSkill(e.target.value)}
            placeholder="Add a technical skill..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
          />
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {state.skills.technical.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveTechnicalSkill(skill)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-700">Soft Skills</h3>
        <form onSubmit={handleAddSoftSkill} className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            placeholder="Add a soft skill..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
          />
          <button
            type="submit"
            className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
          >
            <Plus size={20} />
            <span>Add</span>
          </button>
        </form>
        <div className="flex flex-wrap gap-2">
          {state.skills.soft.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full"
            >
              <span>{skill}</span>
              <button
                onClick={() => handleRemoveSoftSkill(skill)}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;