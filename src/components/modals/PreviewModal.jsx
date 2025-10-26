import { memo } from "react";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Download, X, AlertCircle, FileText } from "lucide-react";
import { HiCheckCircle } from "react-icons/hi2";
import ResumePDF from "../pdf/ResumePDF";
import { useResume } from "../../contexts/ResumeContext";
import { templatesList } from "../../templates";

const MemoizedPDFViewer = memo(({ data, templateId }) => {
  try {
    return (
      <PDFViewer
        width="100%"
        height="100%"
        className="w-full h-full rounded-lg"
      >
        <ResumePDF data={data} templateId={templateId} />
      </PDFViewer>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full h-full sm:h-auto sm:max-h-[95vh] sm:max-w-5xl bg-[#0a0a0a] sm:rounded-2xl border-0 sm:border border-gray-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header with Template Selector */}
        <div className="border-b border-gray-800 bg-[#0a0a0a]">
          <div className="flex items-center justify-between p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Resume Preview
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {state.basics?.fullName || "Your Resume"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <PDFDownloadLink
                document={
                  <ResumePDF data={pdfData} templateId={state.selectedTemplate} />
                }
                fileName={`${
                  state.basics?.fullName?.replace(/\s+/g, "_") || "resume"
                }.pdf`}
                className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20"
              >
                {({ loading }) => (
                  <>
                    <Download size={18} />
                    <span className="text-sm">
                      {loading ? "Preparing..." : "Download"}
                    </span>
                  </>
                )}
              </PDFDownloadLink>

              <button
                onClick={onClose}
                className="p-2.5 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Template Selector */}
          <div className="px-4 sm:px-6 pb-4">
            <p className="text-xs text-gray-400 mb-3">Switch Template:</p>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {templatesList.map((template) => (
                <button
                  key={template.id}
                  onClick={() => dispatch({ type: 'SET_TEMPLATE', template: template.id })}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                    state.selectedTemplate === template.id
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {state.selectedTemplate === template.id && (
                    <HiCheckCircle className="w-4 h-4" />
                  )}
                  {template.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 p-4 sm:p-6 bg-gray-900/30 overflow-hidden">
          <div className="w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <MemoizedPDFViewer
              data={pdfData}
              templateId={state.selectedTemplate}
            />
          </div>
        </div>

        {/* Mobile Download Button */}
        <div className="sm:hidden p-4 border-t border-gray-800 bg-[#0a0a0a]">
          <PDFDownloadLink
            document={
              <ResumePDF data={pdfData} templateId={state.selectedTemplate} />
            }
            fileName={`${
              state.basics?.fullName?.replace(/\s+/g, "_") || "resume"
            }.pdf`}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 active:from-orange-600 active:to-orange-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-orange-500/20"
          >
            {({ loading }) => (
              <>
                <Download size={20} />
                <span>{loading ? "Preparing PDF..." : "Download PDF"}</span>
              </>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
