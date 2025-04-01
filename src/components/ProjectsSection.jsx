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
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: {
        index,
        data: { [field]: value }
      }
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Name"
              value={project.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="url"
              placeholder="Project Link"
              value={project.link}
              onChange={(e) => handleInputChange(index, 'link', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <input
              type="text"
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => handleInputChange(index, 'technologies', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
            />
            <div className="md:col-span-2">
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
                rows={3}
              />
            </div>
             <button
              onClick={() => handleRemoveProject(index)}
              className="flex items-center justify-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={20} />
              <span>Remove Project</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;