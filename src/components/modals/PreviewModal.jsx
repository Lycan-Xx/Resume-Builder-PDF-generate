import { memo } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import { X, AlertCircle, FileText } from "lucide-react";
import { HiCheckCircle } from "react-icons/hi2";
import ResumePDF from "../pdf/ResumePDF";
import { useResume } from "../../contexts/ResumeContext";
import { templatesList } from "../../templates";

const MemoizedPDFViewer = memo(({ data, templateId }) => {
  try {
    return (
      <div className="w-full h-full overflow-hidden">
        <PDFViewer
          width="100%"
          height="100%"
          showToolbar={false}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            borderRadius: "0.5rem",
          }}
        >
          <ResumePDF data={data} templateId={templateId} />
        </PDFViewer>
      </div>
    );
  } catch (err) {
    console.error("PDF Viewer Error:", err);
    return (
      <div className="flex items-center justify-center h-full bg-gray-900/50 rounded-lg">
        <div className="text-center p-6">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">
            PDF Preview Error
          </h3>
          <p className="text-sm text-gray-400 mb-3">
            Unable to generate PDF preview
          </p>
          <pre className="mt-2 text-xs text-red-400 bg-red-500/10 p-3 rounded-lg max-w-md overflow-auto">
            {err.message}
          </pre>
        </div>
      </div>
    );
  }
});

const PreviewModal = ({ isOpen, onClose }) => {
  const { state, dispatch } = useResume();
  const pdfData = { state };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full h-screen md:h-auto md:max-h-[95vh] lg:max-w-5xl md:max-w-4xl bg-[#0a0a0a] md:rounded-2xl border-0 md:border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header with Template Selector */}
        <div className="border-b border-gray-800 bg-[#0a0a0a] flex-shrink-0">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold text-white truncate">
                  Resume Preview
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 truncate">
                  {state.basics?.fullName || "Your Resume"}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0 ml-2"
              aria-label="Close preview"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Template Selector - Mobile optimized */}
          <div className="px-4 md:px-6 pb-4">
            <p className="text-xs text-gray-400 mb-3">Switch Template:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {templatesList.map((template) => (
                <button
                  key={template.id}
                  onClick={() =>
                    dispatch({ type: "SET_TEMPLATE", template: template.id })
                  }
                  className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap ${
                    state.selectedTemplate === template.id
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {state.selectedTemplate === template.id && (
                    <HiCheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span className="hidden xs:inline">{template.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PDF Viewer Container */}
        <div className="flex-1 p-3 sm:p-6 bg-gray-900/30 overflow-hidden min-h-0">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl bg-white">
            <MemoizedPDFViewer
              data={pdfData}
              templateId={state.selectedTemplate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
