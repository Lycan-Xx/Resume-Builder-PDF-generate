import { Users, Plus, Trash2, Linkedin, Github, Twitter, Globe, Link as LinkIcon } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

const ProfilesSection = () => {
  const { state, dispatch } = useResume();

  const handleAddProfile = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'profiles',
      item: {
        platform: 'LinkedIn',
        username: '',
        url: '',
      },
    });
  };

  const handleRemoveProfile = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'profiles',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'profiles',
      index: index,
      data: { [field]: value },
    });
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'LinkedIn':
        return <Linkedin className="w-5 h-5 text-primary-500" />;
      case 'GitHub':
        return <Github className="w-5 h-5 text-primary-500" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5 text-primary-500" />;
      case 'Portfolio':
        return <Globe className="w-5 h-5 text-primary-500" />;
      default:
        return <LinkIcon className="w-5 h-5 text-primary-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Social Profiles</h2>
        </div>
        <button
          onClick={handleAddProfile}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Profile</span>
        </button>
      </div>

      {state.profiles.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No profiles added</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add links to your professional social media profiles
          </p>
          <button
            onClick={handleAddProfile}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Profile</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {state.profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(profile.platform)}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {profile.platform || 'Platform'}
                    </h3>
                    {profile.url && (
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary-600 dark:text-primary-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{profile.username || 'View profile'}</span>
                        <LinkIcon className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveProfile(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    value={profile.platform}
                    onChange={(e) => handleInputChange(index, 'platform', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  >
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="GitHub">GitHub</option>
                    <option value="Twitter">Twitter</option>
                    <option value="Portfolio">Portfolio</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username/Handle
                  </label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={profile.username}
                    onChange={(e) => handleInputChange(index, 'username', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profile URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/yourname"
                    value={profile.url}
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilesSection;