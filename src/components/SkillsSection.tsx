import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const SkillsSection = () => {
  const { state, dispatch } = useResume();
  const [newTechnicalSkill, setNewTechnicalSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const handleAddTechnicalSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTechnicalSkill.trim()) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: {
          technical: [...state.skills.technical, newTechnicalSkill.trim()]
        }
      });
      setNewTechnicalSkill('');
    }
  };

  const handleAddSoftSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSoftSkill.trim()) {
      dispatch({
        type: 'UPDATE_SKILLS',
        payload: {
          soft: [...state.skills.soft, newSoftSkill.trim()]
        }
      });
      setNewSoftSkill('');
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Technical Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {state.skills.technical.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#544cd7] text-white"
              >
                {skill}
                <button className="ml-2">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddTechnicalSkill} className="flex gap-2">
            <input
              type="text"
              value={newTechnicalSkill}
              onChange={(e) => setNewTechnicalSkill(e.target.value)}
              placeholder="Add a technical skill"
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
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Soft Skills</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {state.skills.soft.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[#ec704c] text-white"
              >
                {skill}
                <button className="ml-2">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={handleAddSoftSkill} className="flex gap-2">
            <input
              type="text"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              placeholder="Add a soft skill"
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
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;