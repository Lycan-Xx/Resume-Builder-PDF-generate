import { Handshake, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

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
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Handshake className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Volunteering</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          {/* More options button */}
        </button>
      </div>

      <div className="space-y-4">
        {state.volunteering && state.volunteering.map((volunteer, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {volunteer.organization || 'Organization'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {volunteer.role || 'Volunteer Role'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveVolunteering(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Organization"
                value={volunteer.organization}
                onChange={(e) => handleInputChange(index, 'organization', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                placeholder="Role"
                value={volunteer.role}
                onChange={(e) => handleInputChange(index, 'role', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Start Date"
                  value={volunteer.startDate}
                  onChange={(e) => handleInputChange(index, 'startDate', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={volunteer.endDate}
                  onChange={(e) => handleInputChange(index, 'endDate', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                placeholder="Description"
                value={volunteer.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddVolunteering}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default VolunteeringSection;