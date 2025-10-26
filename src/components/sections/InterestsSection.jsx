import { HiHeart, HiPlus, HiTrash } from 'react-icons/hi2';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiHeart className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Interests</h2>
        </div>
        <button
          onClick={handleAddInterest}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Interest
        </button>
      </div>

      {state.interests.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiHeart className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No interests added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Add your hobbies and interests to personalize your resume
          </p>
          <button
            onClick={handleAddInterest}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Interest
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.interests.map((interest, index) => (
            <div key={index} className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-3"></div>
                  <input
                    type="text"
                    placeholder="Interest name (e.g., Photography, Hiking)"
                    value={interest.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="flex-1 h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                  />
                </div>
                <button
                  onClick={() => handleRemoveInterest(index)}
                  className="ml-2 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
              <textarea
                placeholder="Brief description (optional)"
                value={interest.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 resize-none transition-all"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterestsSection;