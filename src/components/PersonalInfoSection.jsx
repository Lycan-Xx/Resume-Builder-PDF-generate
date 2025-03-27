import React from 'react';
import { useResume } from '../context/ResumeContext';

const PersonalInfoSection = () => {
  const { state, dispatch } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('links.')) {
      const linkType = name.split('.')[1];
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: {
          links: { ...state.personalInfo.links, [linkType]: value }
        }
      });
    } else {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { [name]: value }
      });
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          value={state.personalInfo.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
        <input
          type="email"
          name="email"
          value={state.personalInfo.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
        <input
          type="tel"
          name="phone"
          value={state.personalInfo.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
        <input
          type="text"
          name="location"
          value={state.personalInfo.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
        <input
          type="url"
          name="links.linkedin"
          value={state.personalInfo.links.linkedin || ''}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
        <input
          type="url"
          name="links.github"
          value={state.personalInfo.links.github || ''}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default PersonalInfoSection;