import { Globe, Plus, Trash2 } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const LanguagesSection = () => {
  const { state, dispatch } = useResume();

  const handleAddLanguage = () => {
    dispatch({
      type: 'ADD_LANGUAGE',
      payload: {
        name: '',
        proficiency: 'Intermediate',
      },
    });
  };

  const handleRemoveLanguage = (index) => {
    dispatch({
      type: 'REMOVE_LANGUAGE',
      payload: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_LANGUAGE',
      payload: { index, field, value },
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Globe className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Languages</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          {/* More options button */}
        </button>
      </div>

      <div className="space-y-4">
        {state.languages.map((language, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {language.name || 'Language'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {language.proficiency || 'Proficiency Level'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveLanguage(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Language"
                value={language.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <select
                value={language.proficiency}
                onChange={(e) => handleInputChange(index, 'proficiency', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Elementary">Elementary</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Upper Intermediate">Upper Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Native">Native/Bilingual</option>
              </select>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddLanguage}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default LanguagesSection;