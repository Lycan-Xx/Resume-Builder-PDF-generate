import React from 'react';
import { FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="bg-[#544cd7] p-4 rounded-full">
            <FileText size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900">
          Create Your Professional Resume
        </h1>
        
        <p className="text-xl text-gray-600">
          Build a stunning resume in minutes with our easy-to-use builder. Stand out from the crowd and land your dream job.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simple and intuitive interface that guides you through the resume creation process.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Professional Design</h3>
            <p className="text-gray-600">
              Clean and modern templates that help you make a great first impression.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">PDF Export</h3>
            <p className="text-gray-600">
              Download your resume as a professional PDF ready to send to employers.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/builder')}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors text-lg font-medium"
        >
          <span>Start Building</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default HomePage;