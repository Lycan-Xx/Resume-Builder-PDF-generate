import { useState, useEffect } from "react";
import { Download, CheckCircle, ArrowLeft } from "lucide-react";

const MinimalExportPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setDownloadReady(true), 1500);
  }, []);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false);
      // In real app, trigger actual PDF download here
      console.log("Download started");
    }, 2000);
  };

  const handleBack = () => {
    console.log("Navigate back to builder");
    // In real app: navigate("/builder")
  };

  const fileName = "John_Doe_Resume.pdf";

  return (
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
        className="absolute top-8 left-8 z-50 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="hidden sm:inline">Back</span>
      </button>

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-4 max-w-2xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
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
          Resume Ready
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-zinc-400 font-light mb-12 max-w-md mx-auto">
          Your professional resume is ready to download.
        </p>

        {/* Download Button */}
        <div className="mb-8">
          {downloadReady ? (
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="group inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          ) : (
            <button
              disabled
              className="inline-flex items-center space-x-3 bg-orange-500/50 text-white px-8 py-4 rounded-full text-lg font-medium cursor-not-allowed"
            >
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Generating...</span>
            </button>
          )}
        </div>

        {/* File name hint */}
        <p className="text-sm text-zinc-600 mb-12">{fileName}</p>

        {/* Subtle resume preview mockup */}
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

      {/* Footer Links */}
      <div className="absolute bottom-8 left-8 z-10 flex flex-col sm:flex-row gap-4 sm:gap-8">
        <a
          href="/privacy"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a
          href="https://twitter.com/yourhandle"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
        >
          Made by @yourhandle
        </a>
      </div>
    </div>
  );
};

export default MinimalExportPage;
