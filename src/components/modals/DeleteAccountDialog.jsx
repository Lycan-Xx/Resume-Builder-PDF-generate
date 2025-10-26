import { X, AlertCircle } from "lucide-react";

const DeleteAccountDialog = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white text-center mb-3">
          Feature Not Available
        </h2>

        {/* Message */}
        <p className="text-gray-400 text-center mb-6">
          This feature is not available yet. Please send a request through feedback if you need to delete your account.
        </p>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-all duration-200 border border-gray-700"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountDialog;
