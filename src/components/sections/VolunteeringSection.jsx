import { HiHeart, HiPlus, HiTrash, HiCalendar, HiCheckCircle } from 'react-icons/hi2';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiHeart className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Volunteering</h2>
        </div>
        <button
          onClick={handleAddVolunteering}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Volunteering
        </button>
      </div>

      {state.volunteering && state.volunteering.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiHeart className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No volunteering added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Highlight your community service and volunteer work
          </p>
          <button
            onClick={handleAddVolunteering}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Volunteering
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.volunteering && state.volunteering.map((volunteer, index) => (
            <div key={index} className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">Volunteering {index + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveVolunteering(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      Organization
                    </label>
                    <input
                      type="text"
                      placeholder="Organization name"
                      value={volunteer.organization}
                      onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      Role
                    </label>
                    <input
                      type="text"
                      placeholder="Your role"
                      value={volunteer.role}
                      onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiCalendar className="w-3.5 h-3.5 text-gray-500" />
                      Start Date
                    </label>
                    <MonthYearPicker
                      value={volunteer.startDate}
                      onChange={(date) => handleInputChange(index, 'startDate', date)}
                      placeholder="Select start date"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      End Date
                    </label>
                    <MonthYearPicker
                      value={volunteer.endDate}
                      onChange={(date) => handleInputChange(index, 'endDate', date)}
                      placeholder="Select end date"
                      disabled={volunteer.current}
                    />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={volunteer.current || false}
                      onChange={(e) => handleInputChange(index, 'current', e.target.checked)}
                      className="w-4 h-4 rounded border-gray-700 bg-[#111111] text-orange-500 focus:ring-orange-500 focus:ring-offset-0 transition-all"
                    />
                    <span className="text-sm text-gray-300">I currently volunteer here</span>
                  </label>
                </div>

                {/* Duration display */}
                {volunteer.startDate && (volunteer.endDate || volunteer.current) && (
                  <div className="text-xs text-gray-500 bg-[#111111] px-3 py-2 rounded-md border border-gray-800">
                    <span className="font-medium text-gray-400">Duration: </span>
                    {formatMonthYear(volunteer.startDate)} - {volunteer.current ? 'Present' : formatMonthYear(volunteer.endDate)}
                    {' '}({calculateDuration(volunteer.startDate, volunteer.endDate, volunteer.current)})
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <textarea
                    placeholder="Describe your volunteer work and achievements..."
                    value={volunteer.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 resize-none transition-all"
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

export default VolunteeringSection;