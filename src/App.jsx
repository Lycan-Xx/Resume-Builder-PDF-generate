import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { ResumeProvider } from "./contexts/ResumeContext"
import HomePage from "./pages/HomePage"
import ResumeBuilder from "./pages/ResumeBuilder"
import ExportPage from "./pages/ExportPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/builder",
    element: (
      <ResumeProvider>
        <ResumeBuilder />
      </ResumeProvider>
    ),
  },
  {
    path: "/export",
    element: (
      <ResumeProvider>
        <ExportPage />
      </ResumeProvider>
    ),
  },
])

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  )
}

export default App
