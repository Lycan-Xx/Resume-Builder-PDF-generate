import { Award, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import MonthYearPicker from '../ui/MonthYearPicker';
import { formatMonthYear } from '../../utils/dateUtils';

const AwardsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddAward = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'awards',
      item: {
        title: '',
        issuer: '',
        date: '',
        description: '',
      },
    });
  };

  const handleRemoveAward = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'awards',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'awards',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Award className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Awards</h2>
        </div>
        <button
          onClick={handleAddAward}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Award</span>
        </button>
      </div>

      {state.awards.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No awards added</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Highlight your achievements and recognitions
          </p>
          <button
            onClick={handleAddAward}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Award</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {state.awards.map((award, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Award {index + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveAward(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Award Title
                  </label>
                  <input
                    type="text"
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Issuing Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Issuing Organization"
                    value={award.issuer}
                    onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date Received
                  </label>
                  <MonthYearPicker
                    value={award.date}
                    onChange={(date) => handleInputChange(index, 'date', date)}
                    placeholder="Select date"
                  />
                  {award.date && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatMonthYear(award.date)}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  value={award.description}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AwardsSection;