import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Shield, Trash2, MessageSquare, Camera } from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    avatar: "",
    fullName: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      {/* Mesh overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-zinc-400">Manage your account settings</p>
        </div>

        {/* Profile Information Section */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>

          {/* Avatar */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-800">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-800 bg-gray-900">
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-600" />
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-lg transition-all cursor-pointer">
                <Camera className="w-4 h-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Profile Picture</h3>
              <p className="text-sm text-gray-400">Upload a profile photo</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={profileData.fullName}
                onChange={(e) =>
                  setProfileData({ ...profileData, fullName: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) =>
                  setProfileData({ ...profileData, username: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={profileData.email}
                onChange={(e) =>
                  setProfileData({ ...profileData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-black border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 text-white transition-all"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20">
              Save Changes
            </button>
          </div>
        </div>

        {/* Privacy & Data Section */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Privacy & Data</h2>

          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Privacy Policy</p>
                  <p className="text-sm text-gray-400">View our privacy policy</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-400 rotate-180 transition-colors" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-black border border-red-900/50 rounded-lg hover:border-red-800 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <Trash2 className="w-5 h-5 text-red-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-white">Delete Account</p>
                  <p className="text-sm text-gray-400">Permanently delete your account</p>
                </div>
              </div>
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-red-400 rotate-180 transition-colors" />
            </button>
          </div>
        </div>

        {/* Support & Feedback Section */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Support & Feedback</h2>

          <button className="w-full flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-left">
                <p className="font-medium text-white">Send Feedback</p>
                <p className="text-sm text-gray-400">Help us improve ResumeForge</p>
              </div>
            </div>
            <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-gray-400 rotate-180 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
