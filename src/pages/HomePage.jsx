import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi2";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";
import StashPanel from "./new_resume/StashPanel";
import ResumeNameDialog from "./new_resume/ResumeNameDialouge";
import ConfirmDialog from "../components/modals/ConfirmDialog";
import {
  firestoreService,
  MAX_FREE_RESUMES,
} from "../services/firestore.service";
import { syncService } from "../services/sync.service";

const MinimalResumeLanding = () => {
  const navigate = useNavigate();
  const { user, signingIn, signInWithGoogle } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [limitDialogOpen, setLimitDialogOpen] = useState(false);
  const [isCreatingResume, setIsCreatingResume] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncError, setSyncError] = useState(null);

  // Migration function to convert old resumeData to new stash format
  const migrateOldResumeData = () => {
    try {
      const resumeData = localStorage.getItem("resumeData");
      const existingResumes = localStorage.getItem("resumes");
      const migrationDone = localStorage.getItem("resumeMigrationDone");

      // Only migrate if:
      // 1. There's old resume data
      // 2. Migration hasn't been done before
      // 3. Either no resumes exist or we want to preserve the old data
      if (resumeData && !migrationDone) {
        const parsedData = JSON.parse(resumeData);
        const resumesList = existingResumes ? JSON.parse(existingResumes) : [];

        // Check if this data is already in the stash by comparing basics.fullName
        const dataName = parsedData.basics?.fullName || "Untitled Resume";
        const alreadyExists = resumesList.some(
          (r) => r.data?.basics?.fullName === dataName
        );

        if (!alreadyExists) {
          // Create a new resume entry from the old data
          const migratedResume = {
            id: Date.now().toString(),
            name: dataName || "My Resume",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            data: parsedData,
          };

          resumesList.unshift(migratedResume); // Add to the beginning
          localStorage.setItem("resumes", JSON.stringify(resumesList));
          localStorage.setItem("activeResumeId", migratedResume.id);

          console.log("✅ Successfully migrated old resume data to stash!");
          setResumes(resumesList);
        }

        // Mark migration as done
        localStorage.setItem("resumeMigrationDone", "true");
      }
    } catch (error) {
      console.error("Error during resume migration:", error);
    }
  };

  // Sync local resumes with Firestore when user logs in
  useEffect(() => {
    if (user) {
      syncLocalResumesWithFirestore();
      syncService.startAutoSync();
    } else {
      syncService.stopAutoSync();
    }
  }, [user]);

  // Listen for sync updates to refresh resume list
  useEffect(() => {
    const unsubscribe = syncService.addListener((event) => {
      if (event.type === "resume_updated" || event.type === "sync_complete") {
        // Reload resumes from localStorage to get updated status
        loadResumes();
      }
    });

    return unsubscribe;
  }, []);

  const syncLocalResumesWithFirestore = async () => {
    if (!user) return;

    setIsSyncing(true);
    setSyncError(null);

    try {
      const localResumes =
        resumes.length > 0
          ? resumes
          : JSON.parse(localStorage.getItem("resumes") || "[]");

      console.log("🔄 Syncing local resumes with Firestore...");
      const syncedResumes = await firestoreService.syncLocalResumes(
        user.uid,
        localResumes
      );

      // Ensure all synced resumes have proper timestamps and status
      const resumesWithStatus = syncedResumes.map((resume) => ({
        ...resume,
        lastSyncedAt: resume.lastSyncedAt || new Date().toISOString(),
        syncStatus: resume.syncStatus || "synced",
      }));

      // Update local storage with synced resumes
      localStorage.setItem("resumes", JSON.stringify(resumesWithStatus));
      setResumes(resumesWithStatus);

      console.log("✅ Sync complete:", resumesWithStatus.length, "resumes");
    } catch (error) {
      console.error("❌ Sync error:", error);
      setSyncError(error.message);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    setIsVisible(true);

    // First, try to migrate any old resume data
    migrateOldResumeData();

    // Then load resumes from localStorage
    loadResumes();

    // Check if there's cached resume data and auto-load it
    const activeResumeId = localStorage.getItem("activeResumeId");
    const resumeData = localStorage.getItem("resumeData");

    if (activeResumeId && resumeData) {
      // If there's an active resume with data, ensure it's in the resumes list
      const savedResumes = localStorage.getItem("resumes");
      if (savedResumes) {
        const resumesList = JSON.parse(savedResumes);
        const activeResume = resumesList.find((r) => r.id === activeResumeId);

        if (activeResume) {
          // Update the resume's data reference
          activeResume.data = JSON.parse(resumeData);
          activeResume.updatedAt = new Date().toISOString();
          localStorage.setItem("resumes", JSON.stringify(resumesList));
          setResumes(resumesList);
        }
      }
    }
  }, []);

  const loadResumes = () => {
    try {
      const savedResumes = localStorage.getItem("resumes");
      if (savedResumes) {
        setResumes(JSON.parse(savedResumes));
      }
    } catch (error) {
      console.error("Error loading resumes:", error);
    }
  };

  const saveResumes = (updatedResumes) => {
    try {
      // Ensure all resumes have proper timestamps
      const resumesWithTimestamps = updatedResumes.map((resume) => ({
        ...resume,
        updatedAt: resume.updatedAt || new Date().toISOString(),
        lastSyncedAt: resume.lastSyncedAt || null,
        syncStatus: resume.syncStatus || (user ? "pending" : null),
      }));

      localStorage.setItem("resumes", JSON.stringify(resumesWithTimestamps));
      setResumes(resumesWithTimestamps);
    } catch (error) {
      console.error("Error saving resumes:", error);
    }
  };

  const handleAuthClick = async () => {
    if (user) {
      navigate("/profile");
    } else {
      try {
        await signInWithGoogle();
      } catch (error) {
        console.error("Sign-in error:", error);
      }
    }
  };

  const handleCreateResume = async () => {
    // Check resume limit if user is logged in
    if (user) {
      try {
        const canCreate = await firestoreService.canCreateResume(user.uid);
        if (!canCreate) {
          setLimitDialogOpen(true);
          return;
        }
      } catch (error) {
        console.error("Error checking resume limit:", error);
      }
    } else if (resumes.length >= MAX_FREE_RESUMES) {
      setLimitDialogOpen(true);
      return;
    }

    setIsDialogOpen(true);
  };

  const handleConfirmResumeName = async (name) => {
    setIsCreatingResume(true);

    try {
      // Create empty initial state for new resume
      const emptyResumeData = {
        basics: {
          fullName: "",
          headline: "",
          email: "",
          phone: "",
          location: "",
          website: "",
          profilePicture: null,
        },
        summary: {
          content: "",
        },
        experience: [],
        education: [],
        skills: [],
        languages: [],
        awards: [],
        profiles: [],
        projects: [],
        interests: [],
        certifications: [],
        publications: [],
        volunteering: [],
        references: {
          items: [],
          availableUponRequest: true,
        },
        customSections: [],
        includedSections: {
          basics: true,
          summary: true,
          experience: true,
          education: true,
          skills: true,
          languages: false,
          awards: false,
          profiles: false,
          projects: false,
          interests: false,
          certifications: false,
          publications: false,
          volunteering: false,
          references: false,
        },
        sectionsOrder: [
          "basics",
          "summary",
          "experience",
          "education",
          "skills",
          "languages",
          "awards",
          "profiles",
          "projects",
          "interests",
          "certifications",
          "publications",
          "volunteering",
          "references",
        ],
        selectedTemplate: "professional-red",
        history: {
          past: [],
          present: null,
          future: [],
        },
      };

      const newResume = {
        id: Date.now().toString(),
        name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastSyncedAt: user ? new Date().toISOString() : null,
        syncStatus: user ? "pending" : null,
        data: emptyResumeData,
      };

      const updatedResumes = [...resumes, newResume];
      saveResumes(updatedResumes);

      // Clear the resumeData cache and set new empty data
      localStorage.setItem("resumeData", JSON.stringify(emptyResumeData));

      // Sync to Firestore if user is logged in
      if (user) {
        try {
          const synced = await firestoreService.saveResume(user.uid, newResume);
          // Update with synced data
          const resumeIndex = updatedResumes.findIndex(
            (r) => r.id === newResume.id
          );
          if (resumeIndex !== -1) {
            updatedResumes[resumeIndex] = synced;
            saveResumes(updatedResumes);
          }
        } catch (error) {
          console.error("Error saving resume to Firestore:", error);
          // Continue anyway - will sync later
        }
      }

      // Store the active resume ID
      localStorage.setItem("activeResumeId", newResume.id);

      setIsDialogOpen(false);
      navigate("/builder");
    } catch (error) {
      console.error("Error creating resume:", error);
    } finally {
      setIsCreatingResume(false);
    }
  };

  const handleSelectResume = (resumeId) => {
    localStorage.setItem("activeResumeId", resumeId);

    // Load the resume's data into resumeData for the builder
    const resume = resumes.find((r) => r.id === resumeId);
    if (resume && resume.data) {
      localStorage.setItem("resumeData", JSON.stringify(resume.data));
    }
  };

  const handleDeleteResume = async (resumeId) => {
    const updatedResumes = resumes.filter((r) => r.id !== resumeId);
    saveResumes(updatedResumes);

    // Delete from Firestore if user is logged in
    if (user) {
      try {
        await firestoreService.deleteResume(resumeId);
      } catch (error) {
        console.error("Error deleting resume from Firestore:", error);
        // Continue anyway - local delete succeeded
      }
    }

    // Clear active resume if it was deleted
    const activeResumeId = localStorage.getItem("activeResumeId");
    if (activeResumeId === resumeId) {
      localStorage.removeItem("activeResumeId");
    }
  };

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

      {/* Stash Panel */}
      <StashPanel
        resumes={resumes}
        onCreateResume={handleCreateResume}
        onDeleteResume={handleDeleteResume}
        onSelectResume={handleSelectResume}
      />

      {/* Resume Name Dialog */}
      <ResumeNameDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmResumeName}
        isLoading={isCreatingResume}
      />

      {/* Resume Limit Dialog */}
      <ConfirmDialog
        isOpen={limitDialogOpen}
        onClose={() => setLimitDialogOpen(false)}
        onConfirm={() => setLimitDialogOpen(false)}
        title="Resume Limit Reached"
        message={`You've reached the maximum of ${MAX_FREE_RESUMES} free resumes. Please delete an existing resume to create a new one${
          !user ? ", or sign in to sync your resumes across devices" : ""
        }.`}
        confirmText="Got it"
        cancelText=""
        type="warning"
      />

      {/* Glassy Navbar - Positioned top right on desktop, normal on mobile */}
      <nav className="absolute top-8 right-8 z-50 hidden md:block">
        <button
          onClick={handleAuthClick}
          disabled={signingIn}
          className="backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {signingIn ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : user ? (
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

      {/* Regular navbar for mobile */}
      <nav className="absolute top-6 left-0 right-0 z-50 md:hidden px-4">
        <button
          onClick={handleAuthClick}
          disabled={signingIn}
          className="w-full backdrop-blur-md bg-white/10 border border-white/20 px-6 py-3 rounded-full text-white font-medium hover:bg-white/20 transition-all duration-300 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {signingIn ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Signing in...</span>
            </>
          ) : user ? (
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
              <span>Sign in to save</span>
            </>
          )}
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

        {/* CTA Button - Now triggers dialog */}
        <div className="flex justify-center">
          <button
            onClick={handleCreateResume}
            className="group h-12 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg hover:shadow-orange-500/30"
          >
            <span>Start Building</span>
            <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Subtle feature hint */}
        <div className="mt-12 md:mt-16">
          {/* Desktop: Horizontal */}
          <div className="hidden md:flex justify-center space-x-8 text-sm text-zinc-600">
            <span>Multiple Templates</span>
            <span className="text-zinc-800">•</span>
            <span>ATS-Friendly</span>
            <span className="text-zinc-800">•</span>
            <span>PDF Export</span>
          </div>

          {/* Mobile: Vertical with icons */}
          <div className="md:hidden flex flex-col items-center gap-3 text-sm text-zinc-600">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1v-3z"
                />
              </svg>
              <span>Multiple Templates</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>ATS-Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <span>PDF Export</span>
            </div>
          </div>
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
          href="https://github.com/Lycan-Xx/Resume-Builder-PDF-generate/blob/1c28fb728cd6372e9db9aa11a542c2107a2ae586/privacy-policy.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-600 hover:text-zinc-400 text-sm transition-colors duration-300"
        >
          Privacy Policy
        </a>
      </div>
    </div>
  );
};

export default MinimalResumeLanding;
