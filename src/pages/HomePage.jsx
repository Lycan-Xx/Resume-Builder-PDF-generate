import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import logo from "../assets/logo.png";

const MinimalResumeLanding = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      <div className="absolute inset-0 bg-black opacity-75" />

      {/* Mesh/Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glassy Navbar - Positioned top right on desktop, normal on mobile */}
      <nav className="absolute top-8 right-8 z-50 hidden md:block">
        <button
          onClick={() => navigate("/builder")}
          className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          Get Started
        </button>
      </nav>

      {/* Regular navbar for mobile */}
      <nav className="absolute top-6 left-0 right-0 z-50 md:hidden px-4">
        <button
          onClick={() => navigate("/builder")}
          className="w-full backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg"
        >
          Get Started
        </button>
      </nav>

      {/* Main content */}
      <div
        className={`relative z-10 text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={logo}
            alt="ResumeForge Logo"
            className="w-56 h-56 object-contain rounded-sm"
          />
        </div>

        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 pb-2 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
          ResumeForge
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-md mx-auto">
          Build your resume.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/builder")}
          className="group inline-flex items-center space-x-3 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
        >
          <span>Start Building</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Subtle feature hint */}
        <div className="mt-16 flex justify-center space-x-8 text-sm text-zinc-600">
          <span>PDF Export</span>
          <span className="text-zinc-800">•</span>
          <span>Multiple Templates</span>
          <span className="text-zinc-800">•</span>
          <span>ATS-Friendly</span>
        </div>
      </div>

      {/* Floating resume preview mockup */}
      <div
        className={`absolute right-10 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-1500 delay-300 ${
          isVisible ? "opacity-30 translate-x-0" : "opacity-0 translate-x-20"
        }`}
      >
        <div className="w-64 h-80 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-6 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
          <div className="space-y-4">
            <div className="h-3 w-3/4 bg-orange-500/30 rounded" />
            <div className="h-2 w-1/2 bg-zinc-700/50 rounded" />
            <div className="space-y-2 pt-4">
              <div className="h-2 w-full bg-zinc-700/50 rounded" />
              <div className="h-2 w-5/6 bg-zinc-700/50 rounded" />
              <div className="h-2 w-4/6 bg-zinc-700/50 rounded" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-2 w-full bg-zinc-700/50 rounded" />
              <div className="h-2 w-3/4 bg-zinc-700/50 rounded" />
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block transition-all duration-1500 delay-500 ${
          isVisible ? "opacity-20 translate-x-0" : "opacity-0 -translate-x-20"
        }`}
      >
        <div className="w-64 h-80 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700/50 p-6 shadow-2xl transform -rotate-6 hover:-rotate-3 transition-transform duration-500">
          <div className="space-y-4">
            <div className="h-3 w-2/3 bg-orange-500/30 rounded" />
            <div className="h-2 w-1/3 bg-zinc-700/50 rounded" />
            <div className="space-y-2 pt-4">
              <div className="h-2 w-full bg-zinc-700/50 rounded" />
              <div className="h-2 w-4/5 bg-zinc-700/50 rounded" />
              <div className="h-2 w-3/5 bg-zinc-700/50 rounded" />
            </div>
            <div className="space-y-2 pt-4">
              <div className="h-2 w-full bg-zinc-700/50 rounded" />
              <div className="h-2 w-2/3 bg-zinc-700/50 rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy - Bottom Left */}
      <div className="absolute bottom-8 left-8 z-10">
        <a
          href="/privacy"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default MinimalResumeLanding;
