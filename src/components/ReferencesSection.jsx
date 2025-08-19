import { UserCheck, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const ReferencesSection = () => {
  const { state, dispatch } = useResume();

  const handleAddReference = () => {
    dispatch({
      type: 'UPDATE_SECTION',
      section: 'references',
      data: {
        items: [
          ...state.references.items,
          {
            name: '',
            title: '',
            company: '',
            email: '',
            phone: '',
            relationship: '',
          },
        ],
      },
    });
  };

  const handleRemoveReference = (index) => {
    dispatch({
      type: 'UPDATE_SECTION',
      section: 'references',
      data: {
        items: state.references.items.filter((_, i) => i !== index),
      },
    });
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = state.references.items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    dispatch({
      type: 'UPDATE_SECTION',
      section: 'references',
      data: { items: updatedItems },
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <UserCheck className="w-6 h-6" />
          <h2 className="text-2xl font-bold">References</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Available upon request notice */}
      <div className="mb-6 p-4 bg-gray-800 border border-gray-700 rounded-lg">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
          <p className="text-gray-400 text-sm">Available upon request</p>
        </div>
      </div>

      <div className="space-y-4">
        {state.references.items.map((reference, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {reference.name || 'Reference Name'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {reference.title || 'Title'} {reference.company && `at ${reference.company}`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveReference(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={reference.name}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Job Title"
                  value={reference.title}
                  onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <input
                type="text"
                placeholder="Company"
                value={reference.company}
                onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={reference.email}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={reference.phone}
                  onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <input
                type="text"
                placeholder="Relationship (e.g., Former Manager, Colleague)"
                value={reference.relationship}
                onChange={(e) => handleInputChange(index, 'relationship', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddReference}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default ReferencesSection;