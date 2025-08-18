import React from 'react';
import { Award, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const AwardsSection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();

  const handleAddAward = () => {
    dispatch({
      type: 'ADD_AWARD',
      payload: {
        title: '',
        issuer: '',
        date: '',
        description: '',
      },
    });
  };

  const handleRemoveAward = (index) => {
    dispatch({
      type: 'REMOVE_AWARD',
      payload: index,
    });
    debouncedUpdatePreview();
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_AWARD',
      payload: { index, field, value },
    });
    debouncedUpdatePreview();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Awards</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {state.awards.map((award, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {award.title || 'Award Title'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {award.issuer || 'Issuing Organization'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveAward(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Award Title"
                value={award.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                onBlur={debouncedUpdatePreview}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                placeholder="Issuing Organization"
                value={award.issuer}
                onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                onBlur={debouncedUpdatePreview}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Date Received"
                value={award.date}
                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                onBlur={debouncedUpdatePreview}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Description"
                value={award.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                onBlur={debouncedUpdatePreview}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddAward}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default AwardsSection;