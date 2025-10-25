import { Heart, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

const InterestsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddInterest = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'interests',
      item: {
        name: '',
        description: '',
      },
    });
  };

  const handleRemoveInterest = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'interests',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'interests',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Heart className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Interests</h2>
      </div>

      <div className="space-y-4">
        {state.interests && state.interests.map((interest, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Interest name (e.g., Photography, Hiking)"
                  value={interest.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400"
                />
              </div>
              <button
                onClick={() => handleRemoveInterest(index)}
                className="ml-2 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <textarea
              placeholder="Brief description (optional)"
              value={interest.description}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400 resize-none"
            />
          </div>
        ))}

        {state.interests.length === 0 && (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
            <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No interests added</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add your hobbies and interests to personalize your resume
            </p>
          </div>
        )}

        <button
          onClick={handleAddInterest}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:text-primary-500 hover:border-primary-500 transition-colors"
        >
          <Plus size={20} />
          <span>Add Interest</span>
        </button>
      </div>
    </div>
  );
};

export default InterestsSection;