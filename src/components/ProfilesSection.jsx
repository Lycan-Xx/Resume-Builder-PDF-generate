import React from 'react';
import { Users, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ProfilesSection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();

  const handleAddProfile = () => {
    dispatch({
      type: 'ADD_PROFILE',
      payload: {
        platform: 'LinkedIn',
        username: '',
        url: '',
      },
    });
  };

  const handleRemoveProfile = (index) => {
    dispatch({
      type: 'REMOVE_PROFILE',
      payload: index,
    });
    debouncedUpdatePreview();
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_PROFILE',
      payload: { index, field, value },
    });
    debouncedUpdatePreview();
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Profiles</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {state.profiles.map((profile, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {profile.platform || 'Platform'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {profile.username || 'username'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveProfile(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <select
                value={profile.platform}
                onChange={(e) => handleInputChange(index, 'platform', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="LinkedIn">LinkedIn</option>
                <option value="GitHub">GitHub</option>
                <option value="Twitter">Twitter</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Other">Other</option>
              </select>
              
              <input
                type="text"
                placeholder="Username"
                value={profile.username}
                onChange={(e) => handleInputChange(index, 'username', e.target.value)}
                onBlur={debouncedUpdatePreview}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="url"
                placeholder="Profile URL"
                value={profile.url}
                onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                onBlur={debouncedUpdatePreview}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddProfile}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilesSection;