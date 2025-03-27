import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { FileText } from 'lucide-react';
import HomePage from './pages/HomePage';
import ResumeBuilder from './pages/ResumeBuilder';
import { ResumeProvider } from './context/ResumeContext';

// Root layout component that includes the navigation
const RootLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-[#544cd7] text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center space-x-2 text-xl font-bold">
            <FileText size={24} />
            <span>ResumeForge</span>
          </a>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

// Create router configuration
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/builder",
        element: (
          <ResumeProvider>
            <ResumeBuilder />
          </ResumeProvider>
        )
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;