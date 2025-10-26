import { HiUser, HiEnvelope, HiPhone, HiMapPin, HiInformationCircle } from 'react-icons/hi2';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useResume } from '../../contexts/ResumeContext';

const PersonalInfoSection = () => {
  const { state, dispatch } = useResume();

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <HiUser className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Personal Information</h2>
      </div>

      {/* Personal Details */}
      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiUser className="w-3.5 h-3.5 text-gray-500" />
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={state.personalInfo.name || ''}
              onChange={handleChange}
              placeholder="e.g. John Smith"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiEnvelope className="w-3.5 h-3.5 text-gray-500" />
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={state.personalInfo.email || ''}
              onChange={handleChange}
              placeholder="e.g. johnsmith@example.com"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiPhone className="w-3.5 h-3.5 text-gray-500" />
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={state.personalInfo.phone || ''}
              onChange={handleChange}
              placeholder="e.g. (123) 456-7890"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiMapPin className="w-3.5 h-3.5 text-gray-500" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={state.personalInfo.location || ''}
              onChange={handleChange}
              placeholder="e.g. New York, NY"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Professional Links */}
      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <HiInformationCircle className="w-4 h-4 text-orange-400" />
          <h3 className="text-sm font-medium text-gray-300">Professional Links</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <FaLinkedin className="w-3.5 h-3.5 text-gray-500" />
              LinkedIn URL
            </label>
            <input
              type="url"
              name="links.linkedin"
              value={state.personalInfo.links?.linkedin || ''}
              onChange={handleChange}
              placeholder="e.g. linkedin.com/in/johnsmith"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <FaGithub className="w-3.5 h-3.5 text-gray-500" />
              GitHub URL
            </label>
            <input
              type="url"
              name="links.github"
              value={state.personalInfo.links?.github || ''}
              onChange={handleChange}
              placeholder="e.g. github.com/johnsmith"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;