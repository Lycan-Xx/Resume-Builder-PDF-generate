import { useResume } from '../contexts/ResumeContext';

const PersonalInfoSection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('links.')) {
      const linkType = name.split('.')[1];
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: {
          links: { ...state.personalInfo.links, [linkType]: value },
        },
      });
    } else {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: { [name]: value },
      });
    }
  };

  return (
    <div className="space-y-8 p-1">
      <h2 className="text-2xl font-semibold text-gray-800 relative before:content-[''] before:absolute before:w-12 before:h-1 before:bg-gradient-to-r before:from-[#0A9396] before:to-[#544cd7] before:-bottom-2">
        Personal Information
      </h2>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center">
              <User size={16} className="mr-1 text-[#0A9396]" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={state.personalInfo.name || ''}
              onChange={handleChange}
              onBlur={debouncedUpdatePreview}
              placeholder="e.g. John Smith"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center">
              <Mail size={16} className="mr-1 text-[#0A9396]" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={state.personalInfo.email || ''}
              onChange={handleChange}
              onBlur={debouncedUpdatePreview}
              placeholder="e.g. johnsmith@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center">
              <Phone size={16} className="mr-1 text-[#0A9396]" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={state.personalInfo.phone || ''}
              onChange={handleChange}
              onBlur={debouncedUpdatePreview}
              placeholder="e.g. (123) 456-7890"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-600 flex items-center">
              <MapPin size={16} className="mr-1 text-[#0A9396]" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={state.personalInfo.location || ''}
              onChange={handleChange}
              onBlur={debouncedUpdatePreview}
              placeholder="e.g. New York, NY"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A9396] focus:border-transparent transition-all outline-none"
            />
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="text-lg font-medium text-gray-700 flex items-center mb-4">
            <Info size={18} className="mr-2 text-[#544cd7]" />
            Professional Links
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <Linkedin size={16} className="mr-1 text-[#544cd7]" />
                LinkedIn URL
              </label>
              <input
                type="url"
                name="links.linkedin"
                value={state.personalInfo.links?.linkedin || ''}
                onChange={handleChange}
                onBlur={debouncedUpdatePreview}
                placeholder="e.g. linkedin.com/in/johnsmith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent transition-all outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-600 flex items-center">
                <Github size={16} className="mr-1 text-[#544cd7]" />
                GitHub URL
              </label>
              <input
                type="url"
                name="links.github"
                value={state.personalInfo.links?.github || ''}
                onChange={handleChange}
                onBlur={debouncedUpdatePreview}
                placeholder="e.g. github.com/johnsmith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent transition-all outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
