import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Download, CheckCircle, ArrowLeft, Eye, Share2 } from "lucide-react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useResume } from "../contexts/ResumeContext";
import { useAuth } from "../contexts/AuthContext";
import ResumePDF from "../components/pdf/ResumePDF";
import ThankYouModal from "../components/modals/ThankYouModal";

const MinimalExportPage = () => {
  const navigate = useNavigate();
  const { state } = useResume();
  const { user, signInWithGoogle } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const downloadLinkRef = useRef(null);
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setDownloadReady(true), 1500);
  }, []);

  const handleBack = () => {
    setIsNavigating(true);
    setTimeout(() => {
      navigate("/builder");
    }, 300);
  };

  const pdfData = { state };
  const fileName = `${
    state.basics?.fullName?.replace(/\s+/g, "_") || "Resume"
  }.pdf`;

  const handlePreviewToggle = () => {
    if (!showPreview) {
      setIsPreviewLoading(true);
      setTimeout(() => {
        setShowPreview(true);
        setIsPreviewLoading(false);
      }, 500);
    } else {
      setShowPreview(false);
    }
  };

  const handleDownloadClick = () => {
    setShowThankYouModal(true);
  };

  const handleModalDownload = () => {
    // Trigger the hidden download link
    if (downloadLinkRef.current) {
      downloadLinkRef.current.click();
    }
    setShowThankYouModal(false);
  };

  const handleShare = async () => {
    const shareUrl = "https://resumeforge.pages.dev/";
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ResumeForge - Professional Resume Builder",
          text: "Check out ResumeForge! Create professional resumes easily.",
          url: shareUrl,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.log("Error sharing:", error);
          // Fallback: copy link to clipboard
          navigator.clipboard.writeText(shareUrl);
          alert("Link copied to clipboard!");
        }
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <>
      {/* Hidden Download Link */}
      <PDFDownloadLink
        ref={downloadLinkRef}
        document={
          <ResumePDF
            data={pdfData}
            templateId={state.selectedTemplate}
          />
        }
        fileName={fileName}
        style={{ display: 'none' }}
      >
        {({ loading }) => (loading ? 'Loading...' : 'Download')}
      </PDFDownloadLink>

      {/* Thank You Modal */}
      <ThankYouModal
        isOpen={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        onDownload={handleModalDownload}
        onShare={handleShare}
      />

      <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background image from Unsplash */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80)",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Mesh/Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Back Button */}
      <button
        onClick={handleBack}
        disabled={isNavigating}
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isNavigating ? (
          <>
            <div className="w-5 h-5 border-2 border-zinc-400/30 border-t-zinc-400 rounded-full animate-spin" />
            <span className="hidden sm:inline">Going back...</span>
          </>
        ) : (
          <>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="hidden sm:inline">Back</span>
          </>
        )}
      </button>

      {/* Sign In/Welcome Button - Top Right */}
      <nav className="absolute top-8 right-8 z-50 hidden md:block">
        <button
          onClick={async () => {
            if (user) {
              navigate("/profile");
            } else {
              try {
                await signInWithGoogle();
              } catch (error) {
                console.error("Sign-in error:", error);
              }
            }
          }}
          className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg flex items-center gap-2"
        >
          {user ? (
            <>
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-5 h-5 rounded-full"
                />
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              <span>
                Welcome, {user.displayName?.split(" ")[0] || user.username}
              </span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Sign in to save your resume</span>
            </>
          )}
        </button>
      </nav>

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-4 w-full mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header Content - Constrained */}
        <div className="max-w-2xl mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-20 animate-pulse" />
              <div className="relative bg-green-500/20 p-6 rounded-full border border-green-500/30">
                <CheckCircle
                  className="w-16 h-16 text-green-400"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Your Resume is ready
          </h1>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {downloadReady ? (
              <>
                <button
                  onClick={handleDownloadClick}
                  className="group h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30"
                >
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  <span>Download PDF</span>
                </button>

                <button
                  onClick={handlePreviewToggle}
                  disabled={isPreviewLoading}
                  className="group h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPreviewLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-5 h-5" />
                      <span>{showPreview ? "Hide" : "Preview"}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="group h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Share</span>
                </button>
              </>
            ) : (
              <button
                disabled
                className="h-12 px-8 bg-orange-500/50 text-white rounded-full font-medium cursor-not-allowed flex items-center justify-center gap-2"
              >
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Generating...</span>
              </button>
            )}
          </div>

          {/* File name hint */}
          <p className="text-sm text-zinc-600 mb-12">{fileName}</p>
        </div>
        {/* End Header Content */}

        {/* PDF Preview - Full Width */}
        {showPreview && downloadReady && (
          <div className="relative w-full max-w-6xl mx-auto mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-4 shadow-2xl">
              <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-lg overflow-hidden">
                <PDFViewer width="100%" height="100%" className="w-full h-full">
                  <ResumePDF
                    data={pdfData}
                    templateId={state.selectedTemplate}
                  />
                </PDFViewer>
              </div>
            </div>
          </div>
        )}

        {/* Subtle resume preview mockup - only show when not previewing */}
        {!showPreview && (
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-orange-500/5 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-full max-w-sm mx-auto h-64 bg-zinc-900/30 backdrop-blur-sm rounded-lg border border-zinc-800/50 p-6 shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className="space-y-3 opacity-50">
                  <div className="h-4 w-3/4 bg-orange-500/20 rounded" />
                  <div className="h-3 w-1/2 bg-zinc-700/30 rounded" />
                  <div className="space-y-2 pt-4">
                    <div className="h-2 w-full bg-zinc-700/30 rounded" />
                    <div className="h-2 w-5/6 bg-zinc-700/30 rounded" />
                    <div className="h-2 w-4/6 bg-zinc-700/30 rounded" />
                  </div>
                  <div className="space-y-2 pt-4">
                    <div className="h-2 w-full bg-zinc-700/30 rounded" />
                    <div className="h-2 w-3/4 bg-zinc-700/30 rounded" />
                    <div className="h-2 w-2/3 bg-zinc-700/30 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="absolute bottom-8 left-8 z-10 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <a
          href="https://github.com/Lycan-Xx/Resume-Builder-PDF-generate/blob/1c28fb728cd6372e9db9aa11a542c2107a2ae586/privacy-policy.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300">
          Made by @Lycan_Xx👾
        </a>
      </div>

      {/* Social Media Links - Bottom Right */}
      <div className="absolute bottom-8 right-8 z-10 flex items-center gap-4">
        {/* Twitter */}
        <a
          href="https://x.com/LycanXx0"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="Twitter"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 flex items-center justify-center transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-zinc-600 group-hover:text-orange-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/mohammad-bello/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="LinkedIn"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 flex items-center justify-center transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-zinc-600 group-hover:text-orange-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </div>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Lycan-Xx"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="GitHub"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 flex items-center justify-center transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-zinc-600 group-hover:text-orange-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
        </a>

        {/* YouTube */}
        <a
          href="https://youtube.com/@Lycan_Xx"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative"
          aria-label="YouTube"
        >
          <div className="w-10 h-10 rounded-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 flex items-center justify-center transition-all duration-300 group-hover:border-orange-500/50 group-hover:bg-orange-500/10 group-hover:scale-110">
            <svg
              className="w-5 h-5 text-zinc-600 group-hover:text-orange-400 transition-colors duration-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </div>
        </a>
      </div>
    </div>
    </>
  );
};

export default MinimalExportPage;
