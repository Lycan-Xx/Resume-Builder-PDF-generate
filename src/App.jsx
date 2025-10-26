import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { ThemeProvider } from "./contexts/ThemeContext"
import { ResumeProvider } from "./contexts/ResumeContext"
import { AuthProvider } from "./contexts/AuthContext"
import HomePage from "./pages/HomePage"
import ResumeBuilder from "./pages/ResumeBuilder"
import ExportPage from "./pages/ExportPage"
import ProfilePage from "./pages/ProfilePage"

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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
])

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-[#000000] transition-colors">
          <RouterProvider router={router} />
        </div>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App