import { FileText, Plus, Trash2, ExternalLink, Code } from 'lucide-react';
import { useResume } from '../../contexts/ResumeContext';

const ProjectsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddProject = () => {
    dispatch({
      type: 'ADD_ITEM',
      section: 'projects',
      item: {
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
    });
  };

  const handleRemoveProject = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      section: 'projects',
      index: index,
    });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({
      type: 'UPDATE_ITEM',
      section: 'projects',
      index: index,
      data: { [field]: value },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {state.projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No projects added</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Showcase your best work and technical projects
          </p>
          <button
            onClick={handleAddProject}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Project</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {state.projects.map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Project {index + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <FileText className="w-4 h-4 inline mr-1" />
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Portfolio Website"
                    value={project.name || ''}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <ExternalLink className="w-4 h-4 inline mr-1" />
                    Project Link
                  </label>
                  <input
                    type="url"
                    placeholder="e.g. https://myproject.com"
                    value={project.link || ''}
                    onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Code className="w-4 h-4 inline mr-1" />
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={project.technologies || ''}
                    onChange={(e) => handleInputChange(index, 'technologies', e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Description
                </label>
                <textarea
                  placeholder="Describe your project, its purpose, and your role..."
                  value={project.description || ''}
                  onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
