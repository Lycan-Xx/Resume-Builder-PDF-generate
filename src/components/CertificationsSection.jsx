import { Shield, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const CertificationsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddCertification = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'certifications',
      item: {
        name: '',
        issuer: '',
        date: '',
        description: '',
      },
    });
  };

  const handleRemoveCertification = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'certifications',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'certifications',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Certifications</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {state.certifications.map((cert, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {cert.name || 'Certification Name'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {cert.issuer || 'Issuing Organization'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveCertification(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Certification Name"
                value={cert.name || ''}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                placeholder="Issuing Organization"
                value={cert.issuer || ''}
                onChange={(e) => handleInputChange(index, 'issuer', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                placeholder="Date Obtained"
                value={cert.date || ''}
                onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <textarea
                placeholder="Description"
                value={cert.description || ''}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddCertification}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default CertificationsSection;