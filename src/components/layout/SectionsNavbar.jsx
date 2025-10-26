"use client";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiUser,
  HiDocumentText,
  HiBriefcase,
  HiAcademicCap,
  HiCodeBracket,
  HiGlobeAlt,
  HiTrophy,
  HiLink,
  HiFolderOpen,
  HiHeart,
  HiShieldCheck,
  HiBookOpen,
  HiUserGroup,
  HiPhone,
  HiPlus,
  HiSparkles,
} from "react-icons/hi2";
import { useResume } from "../../contexts/ResumeContext";
import ManageSectionsModal from "../modals/ManageSectionsModal";

const sectionIcons = {
  basics: HiUser,
  summary: HiDocumentText,
  experience: HiBriefcase,
  education: HiAcademicCap,
  skills: HiCodeBracket,
  languages: HiGlobeAlt,
  awards: HiTrophy,
  profiles: HiLink,
  projects: HiFolderOpen,
  interests: HiHeart,
  certifications: HiShieldCheck,
  publications: HiBookOpen,
  volunteering: HiUserGroup,
  references: HiPhone,
};

const sectionLabels = {
  basics: "Basics",
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  languages: "Languages",
  awards: "Awards",
  profiles: "Profiles",
  projects: "Projects",
  interests: "Interests",
  certifications: "Certifications",
  publications: "Publications",
  volunteering: "Volunteering",
  references: "References",
};

const SectionsNavbar = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();
  const { state, hasDataInSection } = useResume();
  const [showManageModal, setShowManageModal] = useState(false);
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  // Enable horizontal scrolling with mouse wheel
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e) => {
      // Only handle horizontal scroll if there's overflow
      if (scrollContainer.scrollWidth > scrollContainer.clientWidth) {
        e.preventDefault();
        scrollContainer.scrollLeft += e.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
    scrollContainer.addEventListener("scroll", checkScroll);

    // Initial check
    checkScroll();

    // Check on resize
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(scrollContainer);

    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
      scrollContainer.removeEventListener("scroll", checkScroll);
      resizeObserver.disconnect();
    };
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  const visibleSections = state.sectionsOrder.filter(
    (sectionId) => state.includedSections[sectionId]
  );

  return (
    <>
      <div className="sticky top-0 z-40 bg-[#0a0a0a] border-b border-gray-800 px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Resume Sections</h2>
          <div className="flex items-center gap-2">
            {/* Finish & Export Button */}
            <button
              onClick={() => navigate("/export")}
              className="flex items-center gap-2 h-8 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg transition-all duration-200 shadow-lg font-medium text-sm"
            >
              <HiSparkles className="w-4 h-4" />
              <span className="sm:hidden">Export</span>
              <span className="hidden sm:inline">Finish & Export</span>
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Left scroll arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gradient-to-r from-[#0a0a0a] to-transparent flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* Right scroll arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-gradient-to-l from-[#0a0a0a] to-transparent flex items-center justify-center text-gray-400 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
          >
            {visibleSections.map((sectionId) => {
              const Icon = sectionIcons[sectionId];
              const hasData = hasDataInSection(sectionId);
              const isActive = activeSection === sectionId;

              return (
                <button
                  key={sectionId}
                  onClick={() => onSectionChange(sectionId)}
                  className={`flex flex-col items-center gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all min-w-[70px] sm:min-w-[80px] flex-shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                      : hasData
                      ? "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20"
                      : "text-gray-500 hover:text-gray-300 hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="text-xs font-medium whitespace-nowrap">
                    {sectionLabels[sectionId]}
                  </span>
                  {hasData && (
                    <div
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        isActive ? "bg-white" : "bg-orange-500"
                      }`}
                    />
                  )}
                </button>
              );
            })}

            <button
              onClick={() => setShowManageModal(true)}
              className="flex flex-col items-center gap-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800 transition-all min-w-[70px] sm:min-w-[80px] border-2 border-dashed border-gray-700 flex-shrink-0"
            >
              <HiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs font-medium">Add</span>
            </button>
          </div>
        </div>
      </div>

      <ManageSectionsModal
        isOpen={showManageModal}
        onClose={() => setShowManageModal(false)}
      />
    </>
  );
};

export default SectionsNavbar;
