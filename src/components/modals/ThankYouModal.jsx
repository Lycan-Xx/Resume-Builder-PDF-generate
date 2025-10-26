import { HiXMark, HiHeart, HiShare, HiArrowDownTray } from "react-icons/hi2";

const ThankYouModal = ({ isOpen, onClose, onDownload, onShare }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="relative p-6 md:p-8 border-b border-gray-800">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
          >
            <HiXMark className="w-5 h-5" />
          </button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="p-4 rounded-full bg-orange-500/10 border border-orange-500/20">
              <HiHeart className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-semibold text-white text-center mb-2">
            Thank You for Using ResumeForge!
          </h2>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 space-y-4">
          <p className="text-base md:text-lg text-gray-300 text-center leading-relaxed">
            If you have any feedback or suggestions, I'd be happy to hear from you at{" "}
            <a
              href="mailto:msbello@cc.cc"
              className="text-orange-400 hover:text-orange-300 underline decoration-orange-400/30 hover:decoration-orange-300 transition-colors"
            >
              msbello@cc.cc
            </a>
          </p>

          <div className="bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-lg p-4 md:p-5">
            <p className="text-sm md:text-base text-gray-300 text-center">
              Please share this with your friends, family, and colleagues if you find it helpful so they can also have a test! 🚀
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 p-6 md:p-8 pt-0">
          <button
            onClick={onDownload}
            className="flex-1 h-11 md:h-12 px-5 md:px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30"
          >
            <HiArrowDownTray className="w-5 h-5" />
            <span>Download</span>
          </button>
          <button
            onClick={onShare}
            className="flex-1 h-11 md:h-12 px-5 md:px-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-orange-500/50 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium"
          >
            <HiShare className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
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
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ThankYouModal;
