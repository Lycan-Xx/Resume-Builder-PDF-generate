import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ProjectsSection = () => {
  const { state, dispatch } = useResume();

  const handleAddProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        name: '',
        description: '',
        technologies: [],
        links: [],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Projects</h2>
        <button
          onClick={handleAddProject}
          className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
        >
          <Plus size={20} />
          <span>Add Project</span>
        </button>
      </div>

      {state.projects.map((project, index) => (
        <div key={index} className="bg-gray-50 p-6 rounded-lg space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <textarea
              placeholder="Project Description"
              value={project.description}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Technologies (comma-separated)"
              value={project.technologies.join(', ')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="url"
              placeholder="Project Link"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
          </div>

          <button
            className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 size={20} />
            <span>Remove Project</span>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;