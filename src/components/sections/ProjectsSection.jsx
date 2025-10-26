import { HiDocumentText, HiPlus, HiTrash, HiLink, HiCodeBracket } from 'react-icons/hi2';
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiDocumentText className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Projects</h2>
        </div>
        <button
          onClick={handleAddProject}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {state.projects.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiDocumentText className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No projects added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Showcase your best work and technical projects
          </p>
          <button
            onClick={handleAddProject}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {state.projects.map((project, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">Project {index + 1}</span>
                </div>
                <button
                  onClick={() => handleRemoveProject(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiDocumentText className="w-3.5 h-3.5 text-gray-500" />
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Portfolio Website"
                      value={project.name || ''}
                      onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiLink className="w-3.5 h-3.5 text-gray-500" />
                      Project Link
                    </label>
                    <input
                      type="url"
                      placeholder="e.g. https://myproject.com"
                      value={project.link || ''}
                      onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                    <HiCodeBracket className="w-3.5 h-3.5 text-gray-500" />
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. React, Node.js, MongoDB"
                    value={project.technologies || ''}
                    onChange={(e) => handleInputChange(index, 'technologies', e.target.value)}
                    className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Project Description
                  </label>
                  <textarea
                    placeholder="Describe your project, its purpose, and your role..."
                    value={project.description || ''}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                    rows={4}
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

export default ProjectsSection;