"use client"
import { FileText } from "lucide-react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useResume } from "../../contexts/ResumeContext"

const SummarySection = () => {
  const { state, dispatch } = useResume()
  const summary = state.summary

  const handleContentChange = (content) => {
    dispatch({
      type: "UPDATE_SECTION",
      section: "summary",
      data: { content },
    })
  }

  const modules = {
    toolbar: [["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }], ["clean"]],
  }

  const formats = ["bold", "italic", "underline", "list", "bullet"]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <FileText className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Professional Summary</h2>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Write a compelling summary that highlights your key achievements, skills, and career objectives.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600">
          <ReactQuill
            theme="snow"
            value={summary.content}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            placeholder="Write your professional summary here..."
            className="text-gray-900 dark:text-white"
            style={{ minHeight: "200px" }}
          />
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>
            💡 <strong>Tips:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Keep it concise (2-4 sentences)</li>
            <li>Highlight your most relevant achievements</li>
            <li>Include keywords from your target job</li>
            <li>Show your value proposition</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SummarySection
