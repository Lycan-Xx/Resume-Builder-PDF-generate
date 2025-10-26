"use client";
import { HiUser, HiArrowLeft, HiHome } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#0a0a0a] border-b border-gray-800 px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left Side - Logo + Homepage Button */}
        <div className="flex items-center gap-3">
          {/* Mobile: Logo + Home in Border */}
          <button
            onClick={() => navigate("/")}
            className="md:hidden flex items-center gap-2 px-3 py-2 border border-gray-700 rounded-lg hover:border-orange-500 hover:bg-gray-800/50 transition-all duration-200"
          >
            <img
              src={logo}
              alt="ResumeForge Logo"
              className="w-8 h-8 object-contain rounded-sm"
            />
            <span className="text-sm font-medium text-white">Homepage</span>
          </button>

          {/* Desktop: Logo + Title + Homepage Button */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt="ResumeForge Logo"
                className="w-12 h-12 object-contain rounded-sm"
              />
              <h1 className="text-2xl font-bold text-white">ResumeForge</h1>
            </div>
            
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 border border-gray-700 rounded-lg hover:border-orange-500 hover:bg-gray-800/50 transition-all duration-200"
            >
              <HiArrowLeft className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-white">Homepage</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Profile Button */}
          <button
            onClick={() => navigate("/profile")}
            className="hidden md:flex items-center gap-2 h-10 px-5 backdrop-blur-md bg-white/10 border border-white/20 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <HiUser className="w-4 h-4" />
            <span className="text-sm">Profile</span>
          </button>

          {/* Profile Button Mobile */}
          <button
            onClick={() => navigate("/profile")}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg border-2 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 hover:border-orange-500 transition-all duration-200"
            title="Profile"
          >
            <HiUser className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
