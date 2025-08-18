import React from 'react';
import { FileText, Bold, Italic, Underline, Link, Code, List, AlignLeft, AlignCenter, AlignRight, AlignJustify, Indent, Outdent, Quote, Hash, Minus } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const SummarySection = () => {
  const { state, dispatch, debouncedUpdatePreview } = useResume();

  const handleChange = (value) => {
    dispatch({
      type: 'UPDATE_SUMMARY',
      payload: value,
    });
  };

  const toolbarButtons = [
    { icon: Bold, action: 'bold' },
    { icon: Italic, action: 'italic' },
    { icon: Underline, action: 'underline' },
    { icon: Code, action: 'code' },
    { icon: Link, action: 'link' },
    { icon: Quote, action: 'quote' },
    { icon: List, action: 'list' },
    { icon: Hash, action: 'heading' },
    { icon: Minus, action: 'hr' },
    { icon: AlignLeft, action: 'align-left' },
    { icon: AlignCenter, action: 'align-center' },
    { icon: AlignRight, action: 'align-right' },
    { icon: AlignJustify, action: 'align-justify' },
    { icon: Indent, action: 'indent' },
    { icon: Outdent, action: 'outdent' },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FileText className="w-6 h-6" />
          <h2 className="text-2xl font-bold">Summary</h2>
        </div>
      </div>

      <div className="space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-1 p-2 bg-gray-800 rounded-md border border-gray-700">
          {toolbarButtons.map((button, index) => (
            <button
              key={index}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
              title={button.action}
            >
              <button.icon size={16} className="text-gray-300" />
            </button>
          ))}
        </div>

        {/* Text Editor */}
        <div className="relative">
          <textarea
            value={state.summary}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={debouncedUpdatePreview}
            placeholder="Innovative Web Developer with 5 years of experience in building impactful and user-friendly websites and applications. Specializes in front-end technologies and passionate about modern web standards and cutting-edge development techniques. Proven track record of leading successful projects from concept to deployment."
            rows={8}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          
          {/* Character count indicator */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500">
            {state.summary.length} characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummarySection;