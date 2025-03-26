import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowRight, CheckCircle } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    'Professional Templates',
    'ATS-Friendly Formats',
    'Easy Customization',
    'PDF Export',
    'Real-time Preview',
    'Multiple Sections Support',
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Create Your Professional Resume in Minutes
          </h1>
          <p className="text-xl text-gray-600">
            Stand out from the crowd with a beautifully designed, ATS-friendly resume that highlights your unique skills and experiences.
          </p>
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="text-[#544cd7]" size={20} />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/builder')}
            className="flex items-center space-x-2 px-6 py-3 bg-[#544cd7] hover:bg-[#4038ac] text-white rounded-lg transition-colors"
          >
            <span>Start Building</span>
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="lg:w-1/2">
          <div className="relative">
            <div className="absolute -inset-4 bg-[#ec704c] rounded-lg opacity-20 blur"></div>
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=2070"
              alt="Resume Builder"
              className="rounded-lg shadow-2xl relative"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;