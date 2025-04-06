import React from 'react';
import { Plus, Trash2, ExternalLink, Code, FileText } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ProjectsSection = () => {
  const { state, dispatch } = useResume();
  
  const handleAddProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        name: '',
        description: '',
        technologies: '',
        link: '',
      },
    });
  };
  
  const handleRemoveProject = (index) => {
    dispatch({
      type: 'REMOVE_PROJECT',
      payload: index,
    });
  };
  
  const handleInputChange = (index, field, value) => {
    // Input validation (commented out as requested)
    /*
    if (field === 'name' && value.length > 100) {
      return;
    }
    if (field === 'link' && value !== '' && !value.startsWith('http')) {
      return;
    }
    if (field === 'description' && value.length > 500) {
      return;
    }
    */
    
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: {
        index,
        data: { [field]: value }
      }
    });
  };
  
  return (
    <div className="space-y-8 p-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-gradient-to-r before:from-[#0A9396] before:to-[#544cd7] before:-bottom-2">
          Projects
        </h2>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-[#0A9396] text-white rounded-lg hover:bg-[#088586] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span className="font-medium">Add Project</span>
        </button>
      </div>
      
      {state.projects.length === 0 && (
        <div className="bg-gray-50/70 p-8 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
          <FileText size={36} className="text-gray-400 mb-2" />
          <div className="text-gray-500 mb-2">No projects added yet</div>
          <button
            onClick={handleAddProject}
            className="flex items-center space-x-2 px-4 py-2 text-[#0A9396] hover:bg-[#0A9396]/10 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add your first project</span>
          </button>
        </div>
      )}
      
      {state.projects.map((project, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg space-y-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <FileText size={16} className="mr-1 text-[#0A9396]" />
                Project Name
              </label>
              <input
                type="text"
                placeholder="e.g. Portfolio Website"
                value={project.name || ''}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <ExternalLink size={16} className="mr-1 text-[#0A9396]" />
                Project Link
              </label>
              <input
                type="url"
                placeholder="e.g. https://myproject.com"
                value={project.link || ''}
                onChange={(e) => handleInputChange(index, 'link', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <Code size={16} className="mr-1 text-[#0A9396]" />
                Technologies Used
              </label>
              <input
                type="text"
                placeholder="e.g. React, Node.js, MongoDB"
                value={project.technologies || ''}
                onChange={(e) => handleInputChange(index, 'technologies', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600">
              Project Description
            </label>
            <textarea
              placeholder="Describe your project, its purpose, and your role..."
              value={project.description || ''}
              onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              rows={4}
            />
          </div>
          
          <div className="pt-3">
            <button
              onClick={() => handleRemoveProject(index)}
              className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <Trash2 size={18} />
              <span>Remove Project</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;