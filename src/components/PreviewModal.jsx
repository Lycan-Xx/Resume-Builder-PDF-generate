import React from 'react';
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Download, X } from 'lucide-react';
import ResumePDF from './ResumePDF';

const PreviewModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        ></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:max-w-4xl">
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resume Preview</h3>
              <div className="flex items-center space-x-2">
                <PDFDownloadLink
                  document={<ResumePDF data={data} />}
                  fileName={`${data.personalInfo.name || 'resume'}.pdf`}
                  className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
                >
                  {({ loading }) => (
                    <>
                      <Download size={20} />
                      <span>{loading ? 'Preparing...' : 'Download PDF'}</span>
                    </>
                  )}
                </PDFDownloadLink>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="w-full h-[80vh] overflow-auto bg-gray-100 rounded-lg">
              <PDFViewer width="100%" height="100%" className="w-full h-full">
                <ResumePDF data={data} />
              </PDFViewer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;