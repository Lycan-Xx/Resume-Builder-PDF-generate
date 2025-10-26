import { useState } from "react";
import { HiChevronRight, HiPlus, HiTrash, HiDocumentText, HiCloud, HiCloudArrowUp } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useResumeSync } from "../../hooks/useResumeSync";
import ConfirmDialog from "../../components/modals/ConfirmDialog";

const StashPanel = ({ resumes, onCreateResume, onDeleteResume, onSelectResume }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [resumeToDelete, setResumeToDelete] = useState(null);
  const navigate = useNavigate();
  const { isOnline, isSyncing, pendingCount } = useResumeSync();

  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return "Invalid date";
      
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffMinutes < 1) return "Just now";
      if (diffMinutes < 60) return `${diffMinutes} min ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      
      return date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined 
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Unknown";
    }
  };

  const handleResumeClick = (resumeId) => {
    onSelectResume(resumeId);
    navigate("/builder");
  };

  const handleDeleteClick = (e, resume) => {
    e.stopPropagation();
    setResumeToDelete(resume);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (resumeToDelete) {
      onDeleteResume(resumeToDelete.id);
      setResumeToDelete(null);
    }
  };

  return (
    <>
      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setResumeToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Resume?"
        message={`Are you sure you want to delete "${resumeToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
      {/* Backdrop overlay when expanded */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Stash Panel - Right side, suspended with gaps, responsive */}
      <div
        className={`fixed right-0 top-0 h-full z-50 transition-transform duration-300 ease-in-out ${
          isExpanded ? "translate-x-0" : "translate-x-full md:translate-x-[340px]"
        }`}
      >
        <div className="relative h-full w-full md:w-[380px] flex items-center p-4 md:pr-0 md:py-0">
          {/* Toggle Button - Hidden on mobile when expanded */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute -left-10 top-1/2 -translate-y-1/2 w-10 h-20 bg-white/10 backdrop-blur-xl border border-r-0 border-white/20 rounded-l-lg flex items-center justify-center hover:bg-orange-500/20 transition-all duration-300 group shadow-lg ${
              isExpanded ? "md:flex hidden" : "flex"
            }`}
          >
            <HiChevronRight
              className={`w-5 h-5 text-gray-300 group-hover:text-orange-400 transition-all duration-300 ${
                isExpanded ? "" : "rotate-180"
              }`}
            />
          </button>

          {/* Suspended Panel with glossy effect - Darker on mobile, folded look on desktop */}
          <div 
            className="w-full h-[calc(100vh-6rem)] md:h-[calc(100vh-2rem)] my-auto bg-black/40 md:bg-white/5 backdrop-blur-2xl border border-white/10 md:border-r-0 rounded-2xl md:rounded-l-2xl md:rounded-r-none shadow-2xl overflow-hidden"
            style={{
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
            }}
          >

            {/* Panel Content */}
            <div className="h-full flex flex-col p-4 md:p-6">
              {/* Header */}
              <div className="mb-4 md:mb-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl md:text-2xl font-semibold text-white">Stash</h2>


                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs md:text-sm text-gray-400/80">Your resume library</p>
                  {/* Sync Status Indicator */}
                  <div className="flex items-center gap-1.5 text-xs">
                    {!isOnline ? (
                      <span className="flex items-center gap-1 text-yellow-400">
                        <HiCloudArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Offline</span>
                      </span>
                    ) : isSyncing ? (
                      <span className="flex items-center gap-1 text-blue-400">
                        <HiCloudArrowUp className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                        <span className="hidden md:inline">Syncing...</span>
                      </span>
                    ) : pendingCount > 0 ? (
                      <span className="flex items-center gap-1 text-orange-400">
                        <HiCloudArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden md:inline">{pendingCount} pending</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-green-400">
                        <HiCloud className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden md:inline">Synced</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Create New Resume Button */}
              <button
                onClick={onCreateResume}
                className="w-full h-11 md:h-12 mb-4 md:mb-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30 text-sm md:text-base"
              >
                <HiPlus className="w-4 h-4 md:w-5 md:h-5" />
                <span>New Resume</span>
              </button>

              {/* Resumes List */}
              <div className="flex-1 overflow-y-auto space-y-2 md:space-y-3 custom-scrollbar">
                {resumes.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 md:mb-4">
                      <HiDocumentText className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-300">No resumes yet</p>
                    <p className="text-xs text-gray-400 mt-1">Create your first resume to get started</p>
                  </div>
                ) : (
                  resumes.map((resume) => (
                    <div
                      key={resume.id}
                      className="group bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:border-orange-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                      onClick={() => handleResumeClick(resume.id)}
                    >
                      {/* Resume Preview Thumbnail */}
                      <div className="h-24 md:h-32 bg-black/20 border-b border-white/10 p-3 md:p-4 relative overflow-hidden">
                        <div className="space-y-1.5 md:space-y-2">
                          <div className="h-1.5 md:h-2 w-3/4 bg-orange-500/30 rounded" />
                          <div className="h-1 md:h-1.5 w-1/2 bg-white/20 rounded" />
                          <div className="space-y-1 md:space-y-1.5 pt-1 md:pt-2">
                            <div className="h-1 md:h-1.5 w-full bg-white/20 rounded" />
                            <div className="h-1 md:h-1.5 w-5/6 bg-white/20 rounded" />
                            <div className="h-1 md:h-1.5 w-4/6 bg-white/20 rounded" />
                          </div>
                        </div>
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/10 transition-all duration-300" />
                      </div>

                      {/* Resume Info */}
                      <div className="p-3 md:p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-white truncate group-hover:text-orange-400 transition-colors">
                              {resume.name}
                            </h3>
                            <p className="text-xs text-gray-400 mt-1">
                              Updated {formatDate(resume.updatedAt)}
                            </p>
                            {resume.lastSyncedAt && (
                              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                <HiCloud className="w-3 h-3" />
                                Synced {formatDate(resume.lastSyncedAt)}
                              </p>
                            )}
                            {resume.syncStatus === "limit_reached" && (
                              <p className="text-xs text-yellow-400 mt-0.5">
                                Not synced (limit reached)
                              </p>
                            )}
                            {resume.syncStatus === "pending" && (
                              <p className="text-xs text-blue-400 mt-0.5 flex items-center gap-1">
                                <HiCloudArrowUp className="w-3 h-3 animate-pulse" />
                                Syncing...
                              </p>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleDeleteClick(e, resume)}
                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-all"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Stats */}
              {resumes.length > 0 && (
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-white/10">
                  <p className="text-xs text-gray-400 text-center">
                    {resumes.length} {resumes.length === 1 ? "resume" : "resumes"} in your stash
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </>
  );
};

export default StashPanel;