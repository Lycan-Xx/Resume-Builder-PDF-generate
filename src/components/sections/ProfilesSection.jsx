"use client"

import { HiLink, HiPlus, HiTrash } from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"

const ProfilesSection = () => {
  const { state, dispatch } = useResume()

  const handleAddProfile = () => {
    dispatch({
      type: "UPDATE_SECTION",
      section: "profiles",
      data: [
        ...state.profiles,
        {
          network: "",
          username: "",
          url: "",
        },
      ],
    })
  }

  const handleRemoveProfile = (index) => {
    const newProfiles = state.profiles.filter((_, i) => i !== index)
    dispatch({
      type: "UPDATE_SECTION",
      section: "profiles",
      data: newProfiles,
    })
  }

  const handleProfileChange = (index, field, value) => {
    const newProfiles = [...state.profiles]
    newProfiles[index] = { ...newProfiles[index], [field]: value }
    dispatch({
      type: "UPDATE_SECTION",
      section: "profiles",
      data: newProfiles,
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <HiLink className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-2xl font-semibold text-white">Social Profiles</h2>
      </div>

      {/* Profiles List */}
      <div className="space-y-4">
        {state.profiles.map((profile, index) => (
          <div
            key={index}
            className="p-6 bg-[#0a0a0a] rounded-xl border border-gray-800 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">Profile {index + 1}</h3>
              <button
                onClick={() => handleRemoveProfile(index)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all"
              >
                <HiTrash className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2.5">
                  Network
                </label>
                <input
                  type="text"
                  value={profile.network}
                  onChange={(e) => handleProfileChange(index, "network", e.target.value)}
                  placeholder="e.g., LinkedIn, GitHub, Twitter"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-600 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2.5">
                  Username
                </label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => handleProfileChange(index, "username", e.target.value)}
                  placeholder="e.g., @johndoe"
                  className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-600 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2.5">
                Profile URL
              </label>
              <input
                type="url"
                value={profile.url}
                onChange={(e) => handleProfileChange(index, "url", e.target.value)}
                placeholder="https://linkedin.com/in/johndoe"
                className="w-full px-4 py-3 bg-[#0a0a0a] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white placeholder-gray-600 transition-all"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Profile Button */}
      <button
        onClick={handleAddProfile}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-700 hover:border-orange-500/50 hover:bg-orange-500/5 rounded-lg transition-all duration-200 text-gray-400 hover:text-orange-400"
      >
        <HiPlus className="w-5 h-5" />
        <span className="font-medium">Add Profile</span>
      </button>
    </div>
  )
}

export default ProfilesSection
