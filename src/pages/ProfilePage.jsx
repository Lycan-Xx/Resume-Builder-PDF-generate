import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, User, Mail, Shield, Trash2, MessageSquare } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import DeleteAccountDialog from "../components/modals/DeleteAccountDialog";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const [profileData, setProfileData] = useState({
    avatar: "",
    fullName: "",
    username: "",
    email: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  // Populate profile data from authenticated user
  useEffect(() => {
    if (user) {
      setProfileData({
        avatar: user.photoURL || "",
        fullName: user.displayName || "",
        username: user.username || user.email?.split('@')[0] || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Redirect to home if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const handleSendFeedback = () => {
    const subject = encodeURIComponent("ResumeForge Feedback");
    const body = encodeURIComponent(
      `Hi ResumeForge Team,\n\nI would like to share the following feedback:\n\n[Please write your feedback here]\n\nBest regards,\n${profileData.fullName || 'User'}`
    );
    window.location.href = `mailto:msbello@cc.cc?subject=${subject}&body=${body}`;
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
          onClick={() => {
            setIsNavigating(true);
            setTimeout(() => navigate(-1), 300);
          }}
          disabled={isNavigating}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isNavigating ? (
            <>
              <div className="w-5 h-5 border-2 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin" />
              <span>Going back...</span>
            </>
          ) : (
            <>
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </>
          )}
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

          {/* Avatar - Read Only */}
          <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-800">
            <div className="relative">
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
            </div>
            <div>
              <h3 className="font-medium text-white mb-1">Profile Picture</h3>
              <p className="text-sm text-gray-400">Synced from your Google account</p>
            </div>
          </div>

          {/* Form Fields - Read Only */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 cursor-not-allowed">
                {profileData.fullName || "Not provided"}
              </div>
              <p className="text-xs text-gray-500 mt-1">Synced from Google account</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <div className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 cursor-not-allowed">
                {profileData.username || "Not provided"}
              </div>
              <p className="text-xs text-gray-500 mt-1">Generated from email</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-gray-400 cursor-not-allowed flex items-center gap-2">
                <Mail className="w-4 h-4" />
                {profileData.email || "Not provided"}
              </div>
              <p className="text-xs text-gray-500 mt-1">Synced from Google account</p>
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <button 
              onClick={handleSignOut}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 border border-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Privacy & Data Section */}
        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sm:p-8 mb-6">
          <h2 className="text-xl font-semibold text-white mb-6">Privacy & Data</h2>

          <div className="space-y-4">
            <a 
              href="https://github.com/Lycan-Xx/Resume-Builder-PDF-generate/blob/1c28fb728cd6372e9db9aa11a542c2107a2ae586/privacy-policy.md"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all group"
            >
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
            </a>

            <button 
              onClick={handleDeleteAccount}
              className="w-full flex items-center justify-between p-4 bg-black border border-red-900/50 rounded-lg hover:border-red-800 transition-all group"
            >
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

          <button 
            onClick={handleSendFeedback}
            className="w-full flex items-center justify-between p-4 bg-black border border-gray-800 rounded-lg hover:border-gray-700 transition-all group"
          >
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

      {/* Delete Account Dialog */}
      <DeleteAccountDialog 
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
      />
    </div>
  );
};

export default ProfilePage;
