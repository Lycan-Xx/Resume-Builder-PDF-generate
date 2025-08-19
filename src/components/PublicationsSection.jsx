import { BookOpen, Plus, Trash2, MoreHorizontal } from 'lucide-react';
import { useResume } from '../contexts/ResumeContext';

const PublicationsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddPublication = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'publications',
      item: {
        title: '',
        publisher: '',
        date: '',
        url: '',
        description: '',
      },
    });
  };

  const handleRemovePublication = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'publications',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'publications',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Publications</h2>
        </div>
        <button className="p-2 hover:bg-gray-800 rounded transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {state.publications && state.publications.map((publication, index) => (
          <div key={index} className="bg-gray-800 border border-gray-700 rounded-lg p-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                <div>
                  <h3 className="font-semibold text-white">
                    {publication.title || 'Publication Title'}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {publication.publisher || 'Publisher'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemovePublication(index)}
                className="p-1 hover:bg-gray-700 rounded transition-colors"
              >
                <Trash2 size={16} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Publication Title"
                value={publication.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              
              <input
                type="text"
                placeholder="Publisher"
                value={publication.publisher}
                onChange={(e) => handleInputChange(index, 'publisher', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Publication Date"
                  value={publication.date}
                  onChange={(e) => handleInputChange(index, 'date', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={publication.url}
                  onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                  className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <textarea
                placeholder="Description"
                value={publication.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        ))}

        <button
          onClick={handleAddPublication}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-700 border-dashed rounded-lg text-gray-400 hover:text-white hover:border-gray-600 transition-colors"
        >
          <Plus size={20} />
          <span>Add a new item</span>
        </button>
      </div>
    </div>
  );
};

export default PublicationsSection;