import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResumeBuilder from './pages/ResumeBuilder';
import { ResumeProvider } from './context/ResumeContext';

const router = createBrowserRouter(
  [
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
  ],
  {
    future: {
      v7_startTransition: true
    }
  }
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;