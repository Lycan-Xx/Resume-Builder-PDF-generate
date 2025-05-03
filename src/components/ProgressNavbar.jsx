// ProgressNavbar.jsx
import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, AlertTriangle } from 'lucide-react';

const ProgressNavbar = ({ 
  sections, 
  currentSection, 
  setCurrentSection, 
  resetForm 
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <>
      <div className="bg-white shadow-sm py-3 relative left-0 right-0 z-10">
        <div className="container mx-auto px-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              {currentSection > 0 && (

                <button 
                  onClick={handlePrevious}
                  className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Go back to previous step"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <h2 className="text-lg font-medium text-gray-800">
                {sections[currentSection].name}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">
                Step {currentSection + 1} of {sections.length}
              </span>



            <button
                onClick={() => setShowResetModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-white hover:text-red-500 border-[2px] border-red-500 transition-colors"
                title="Reset all form data">
                <RotateCcw size={18} />
                <span>Reset</span>
            </button>



            </div>
          </div>
          
          <div className="flex relative">
            {sections.map((section, index) => {
              const isActive = index === currentSection;
              const isCompleted = index < currentSection;
              
              return (
                <div
                  key={section.id}
                  className="flex-1 flex flex-col items-center relative cursor-pointer"
                  onClick={() => {
                    // Allow clicking on completed sections or the next incomplete section
                    if (isCompleted || index === currentSection + 1) {
                      setCurrentSection(index);
                    }
                  }}
                >
                  {/* Connector Line */}
                  {index > 0 && (
                    <div 
                      className="absolute top-4 -left-1/2 w-full h-1 transition-all duration-500"
                      style={{ 
                        backgroundColor: isCompleted || isActive ? section.color : '#e5e7eb',
                        opacity: isCompleted ? 1 : isActive ? 0.7 : 0.3
                      }}
                    />
                  )}
                  
                  {/* Circle Step Indicator */}
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center z-10 transition-all duration-300 ${
                      isActive ? 'ring-4 ring-opacity-30' : ''
                    }`}
                    style={{ 
                      backgroundColor: isCompleted ? section.color : isActive ? section.color : '#f3f4f6',
                      color: isCompleted || isActive ? 'white' : '#6b7280',
                      ringColor: section.color
                    }}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      section.icon
                    )}
                  </div>
                  
                  {/* Section Name */}
                  <span 
                    className={`mt-2 text-xs font-medium transition-all duration-300 ${
                      isActive ? 'text-gray-900' : isCompleted ? 'text-gray-700' : 'text-gray-500'
                    }`}
                  >
                    {section.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4"> {/* Removed h-4 */}
            <div className="flex items-center text-red-500 mb-4">
              <AlertTriangle className="mr-2" size={24} />
              <h3 className="text-xl font-semibold">Reset Form</h3>
            </div>
            <p className="text-gray-700 mb-6">
              Are you sure you want to reset your resume data? All your information will be deleted and cannot be recovered.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetForm();
                  setCurrentSection(0);
                  setShowResetModal(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressNavbar;