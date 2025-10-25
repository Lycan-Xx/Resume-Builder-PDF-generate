import { Handshake, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';
import MonthYearPicker from '../ui/MonthYearPicker';
import { formatMonthYear, calculateDuration } from '../../utils/dateUtils';

const VolunteeringSection = () => {
  const { state, dispatch } = useResume();

  const handleAddVolunteering = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'volunteering',
      item: {
        organization: '',
        role: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
      },
    });
  };

  const handleRemoveVolunteering = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'volunteering',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'volunteering',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Handshake className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Volunteering</h2>
        </div>
        <button
          onClick={handleAddVolunteering}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Volunteering</span>
        </button>
      </div>

      {state.volunteering && state.volunteering.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Handshake className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No volunteering added</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Highlight your community service and volunteer work
          </p>
          <button
            onClick={handleAddVolunteering}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Volunteering</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {state.volunteering && state.volunteering.map((volunteer, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Volunteering {index + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveVolunteering(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    placeholder="Organization"
                    value={volunteer.organization}
                    onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    placeholder="Role"
                    value={volunteer.role}
                    onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Start Date
                    </label>
                    <MonthYearPicker
                      value={volunteer.startDate}
                      onChange={(date) => handleInputChange(index, 'startDate', date)}
                      placeholder="Select date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      End Date
                    </label>
                    <MonthYearPicker
                      value={volunteer.endDate}
                      onChange={(date) => handleInputChange(index, 'endDate', date)}
                      placeholder="Select date"
                      disabled={volunteer.current}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={volunteer.current || false}
                    onChange={(e) => handleInputChange(index, 'current', e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I currently volunteer here</span>
                </label>
              </div>

              {/* Duration display */}
              {volunteer.startDate && (volunteer.endDate || volunteer.current) && (
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Duration: </span>
                  {formatMonthYear(volunteer.startDate)} - {volunteer.current ? 'Present' : formatMonthYear(volunteer.endDate)}
                  {' '}({calculateDuration(volunteer.startDate, volunteer.endDate, volunteer.current)})
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  value={volunteer.description}
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

export default VolunteeringSection;