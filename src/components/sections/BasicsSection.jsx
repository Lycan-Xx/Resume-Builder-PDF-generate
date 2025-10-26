"use client"

import { useRef } from "react"
import { HiUser, HiEnvelope, HiPhone, HiMapPin, HiGlobeAlt, HiCamera } from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"

const BasicsSection = () => {
  const { state, dispatch } = useResume()
  const fileInputRef = useRef(null)
  const basics = state.basics

  const handleInputChange = (field, value) => {
    dispatch({
      type: "UPDATE_SECTION",
      section: "basics",
      data: { [field]: value },
    })
  }

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        handleInputChange("profilePicture", e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <HiUser className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
      </div>

      {/* Profile Picture - Disabled */}
      <div className="relative flex items-center gap-5 p-4 bg-[#0a0a0a] rounded-lg border border-gray-800/50 opacity-60">
        <div className="relative group">
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-700 bg-[#1a1a1a]">
            {basics.profilePicture ? (
              <img
                src={basics.profilePicture || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover grayscale"
              />
            ) : (
              <HiUser className="w-8 h-8 text-gray-600" />
            )}
          </div>
          <button
            disabled
            className="absolute -bottom-0.5 -right-0.5 p-2 bg-gray-700 text-gray-500 rounded-full shadow-lg cursor-not-allowed"
          >
            <HiCamera className="w-3.5 h-3.5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
            disabled
          />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-0.5">Profile Picture</h3>
          <p className="text-xs text-gray-600">Upload a professional headshot</p>
        </div>
        
        {/* Coming Soon Badge */}
        <div className="absolute top-2 right-2 px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-full">
          <span className="text-xs font-medium text-orange-400">Coming Soon</span>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">
            Full Name <span className="text-orange-400">*</span>
          </label>
          <input
            type="text"
            value={basics.fullName}
            onChange={(e) => handleInputChange("fullName", e.target.value)}
            placeholder="John Doe"
            className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
          />
        </div>

        {/* Professional Headline */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-300">
            Professional Headline
          </label>
          <input
            type="text"
            value={basics.headline}
            onChange={(e) => handleInputChange("headline", e.target.value)}
            placeholder="Senior Software Engineer"
            className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiEnvelope className="w-3.5 h-3.5 text-gray-500" />
              Email <span className="text-orange-400">*</span>
            </label>
            <input
              type="email"
              value={basics.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="john@example.com"
              className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiPhone className="w-3.5 h-3.5 text-gray-500" />
              Phone
            </label>
            <input
              type="tel"
              value={basics.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>
        </div>

        {/* Location & Website */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiMapPin className="w-3.5 h-3.5 text-gray-500" />
              Location
            </label>
            <input
              type="text"
              value={basics.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="New York, NY"
              className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
              <HiGlobeAlt className="w-3.5 h-3.5 text-gray-500" />
              Website
            </label>
            <input
              type="url"
              value={basics.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://johndoe.com"
              className="w-full h-9 px-3 text-sm bg-[#0a0a0a] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BasicsSection