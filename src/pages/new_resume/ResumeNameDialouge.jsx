import { useState, useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";

const ResumeNameDialog = ({ isOpen, onClose, onConfirm }) => {
  const [resumeName, setResumeName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setResumeName("");
      setError("");
      // Focus input when dialog opens
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = resumeName.trim();

    if (!trimmedName) {
      setError("Please enter a resume name");
      return;
    }

    if (trimmedName.length < 3) {
      setError("Resume name must be at least 3 characters");
      return;
    }

    onConfirm(trimmedName);
    setResumeName("");
    setError("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-semibold text-white">Create New Resume</h2>
            <p className="text-sm text-gray-500 mt-1">Give your resume a memorable name</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="resume-name" className="block text-sm font-medium text-gray-300 mb-2">
                Resume Name
              </label>
              <input
                ref={inputRef}
                id="resume-name"
                type="text"
                value={resumeName}
                onChange={(e) => {
                  setResumeName(e.target.value);
                  setError("");
                }}
                onKeyDown={handleKeyDown}
                placeholder="e.g., Software Engineer Resume, Marketing Portfolio"
                className="w-full h-11 px-4 text-sm bg-[#111111] border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                maxLength={50}
              />
              {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
              )}
              <p className="text-xs text-gray-600 mt-2">
                {resumeName.length}/50 characters
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-5 text-sm font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!resumeName.trim()}
              className="h-10 px-6 text-sm font-medium bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-orange-500 disabled:hover:to-orange-600"
            >
              Create Resume
            </button>
          </div>
        </form>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ResumeNameDialog;