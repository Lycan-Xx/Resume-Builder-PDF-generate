"use client"
import { FileText, Moon, Sun, Download } from "lucide-react"
import { PDFDownloadLink } from "@react-pdf/renderer"
import ResumePDF from "../pdf/ResumePDF"
import { useTheme } from "../../contexts/ThemeContext"
import { useResume } from "../../contexts/ResumeContext"

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const { state, dispatch } = useResume()

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-500 rounded-lg">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">ResumeForge</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Professional Resume Builder</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">

          {/* Export Button */}
          <PDFDownloadLink
            document={<ResumePDF data={{ state }} />}
            fileName={`${state.basics.fullName || 'resume'}.pdf`}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
          >
            {({ loading }) => (
              <>
                <Download className="w-4 h-4" />
                <span>{loading ? 'Preparing...' : 'Export'}</span>
              </>
            )}
          </PDFDownloadLink>

          {/* Settings */}
          <button className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors">
            {/* Settings icon */}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
