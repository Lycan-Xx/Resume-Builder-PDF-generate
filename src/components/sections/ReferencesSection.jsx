import { HiUserCircle, HiPlus, HiTrash } from 'react-icons/hi2';
import { useResume } from '../../contexts/ResumeContext';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiUserCircle className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">References</h2>
        </div>
        <button
          onClick={handleAddReference}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Reference
        </button>
      </div>

      {state.references.items.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiUserCircle className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No references added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Add professional references who can vouch for your work
          </p>
          <button
            onClick={handleAddReference}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Reference
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.references.items.map((reference, index) => (
            <div key={index} className="bg-[#0a0a0a] border border-gray-800 rounded-lg p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {reference.name || 'Reference Name'}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {reference.title || 'Title'} {reference.company && `at ${reference.company}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveReference(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Full Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={reference.name}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Job Title</label>
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={reference.title}
                      onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Company</label>
                  <input
                    type="text"
                    placeholder="Company"
                    value={reference.company}
                    onChange={(e) => handleInputChange(index, 'company', e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      value={reference.email}
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Phone</label>
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={reference.phone}
                      onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Relationship</label>
                  <input
                    type="text"
                    placeholder="Relationship (e.g., Former Manager, Colleague)"
                    value={reference.relationship}
                    onChange={(e) => handleInputChange(index, 'relationship', e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
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

export default ReferencesSection;