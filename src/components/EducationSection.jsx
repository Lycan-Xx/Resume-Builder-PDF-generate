import React from 'react';
import { Plus, Trash2, GraduationCap, Calendar } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const EducationSection = () => {
  const { state, dispatch } = useResume();
  
  const handleAddEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: '',
        degree: '',
        major: '',
        graduationDate: '',
        gpa: '',
      },
    });
  };
  
  const handleRemoveEducation = (index) => {
    dispatch({
      type: 'REMOVE_EDUCATION',
      payload: index,
    });
  };
  
  const handleInputChange = (index, field, value) => {
    // Input validation (commented out as requested)
    /*
    if (field === 'institution' && value.length > 100) {
      return;
    }
    if (field === 'degree' && value.length > 100) {
      return;
    }
    if (field === 'major' && value.length > 100) {
      return;
    }
    if (field === 'graduationDate' && 
        !/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$|^(0[1-9]|1[0-2])\/(19|20)\d\d$|^(19|20)\d\d$|^Present$|^Expected (0[1-9]|1[0-2])\/(19|20)\d\d$/.test(value)) {
      return;
    }
    if (field === 'gpa' && value !== '' && (isNaN(parseFloat(value)) || parseFloat(value) < 0 || parseFloat(value) > 4.0)) {
      return;
    }
    */
    
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: {
        index,
        data: { [field]: value }
      }
    });
  };
  
  return (
    <div className="space-y-6 p-1">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-gradient-to-r before:from-[#0A9396] before:to-[#544cd7] before:-bottom-2">
          Education
        </h2>
        <button
          onClick={handleAddEducation}
          className="flex items-center space-x-2 px-4 py-2 bg-[#0A9396] text-white rounded-lg hover:bg-[#088586] transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <Plus size={20} strokeWidth={2.5} />
          <span className="font-medium">Add Education</span>
        </button>
      </div>
     
      {state.education.length === 0 && (
        <div className="bg-gray-50/70 p-8 rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center text-center">
          <GraduationCap size={36} className="text-gray-400 mb-2" />
          <div className="text-gray-500 mb-2">No education added yet</div>
          <button
            onClick={handleAddEducation}
            className="flex items-center space-x-2 px-4 py-2 text-[#0A9396] hover:bg-[#0A9396]/10 rounded-lg transition-colors"
          >
            <Plus size={20} />
            <span>Add your educational background</span>
          </button>
        </div>
      )}
      
      {state.education.map((edu, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-lg space-y-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Institution</label>
              <input
                type="text"
                placeholder="University or School Name"
                value={edu.institution}
                onChange={(e) => handleInputChange(index, 'institution', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Degree</label>
              <input
                type="text"
                placeholder="Bachelor's, Master's, PhD, etc."
                value={edu.degree}
                onChange={(e) => handleInputChange(index, 'degree', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Field of Study / Major</label>
              <input
                type="text"
                placeholder="Computer Science, Business, etc."
                value={edu.major}
                onChange={(e) => handleInputChange(index, 'major', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">Graduation Date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="MM/YYYY (or Expected MM/YYYY)"
                  value={edu.graduationDate}
                  onChange={(e) => handleInputChange(index, 'graduationDate', e.target.value)}
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600">GPA (Optional)</label>
              <input
                type="text"
                placeholder="e.g., 3.8/4.0"
                value={edu.gpa}
                onChange={(e) => handleInputChange(index, 'gpa', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
          
          <div className="pt-3">
            <button
              onClick={() => handleRemoveEducation(index)}
              className="flex items-center space-x-2 px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-200"
            >
              <Trash2 size={18} />
              <span>Remove Education</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationSection;