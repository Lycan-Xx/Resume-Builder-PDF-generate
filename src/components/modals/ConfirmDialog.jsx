import { HiXMark, HiExclamationTriangle } from "react-icons/hi2";

const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", type = "danger" }) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      icon: "text-red-400",
      iconBg: "bg-red-500/10",
      button: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    },
    warning: {
      icon: "text-yellow-400",
      iconBg: "bg-yellow-500/10",
      button: "bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700",
    },
    info: {
      icon: "text-orange-400",
      iconBg: "bg-orange-500/10",
      button: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
    },
  };

  const style = typeStyles[type] || typeStyles.danger;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-[#0a0a0a] border border-gray-800 rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-start justify-between p-5 md:p-6 border-b border-gray-800">
          <div className="flex items-start gap-3 md:gap-4">
            <div className={`p-2 md:p-3 rounded-full ${style.iconBg}`}>
              <HiExclamationTriangle className={`w-5 h-5 md:w-6 md:h-6 ${style.icon}`} />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-white">{title}</h2>
              <p className="text-sm md:text-base text-gray-400 mt-1 md:mt-2">{message}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all flex-shrink-0"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 p-5 md:p-6 bg-[#111111]">
          {cancelText && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-10 md:h-11 px-5 md:px-6 text-sm md:text-base font-medium text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`w-full sm:w-auto h-10 md:h-11 px-5 md:px-6 text-sm md:text-base font-medium text-white rounded-lg transition-all duration-200 shadow-lg ${style.button}`}
          >
            {confirmText}
          </button>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
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

export default ConfirmDialog;
