"use client"
import { FileText } from "lucide-react"
import { useResume } from "../../contexts/ResumeContext"
import { useState, useEffect } from "react"

const SummarySection = () => {
  const { state, dispatch } = useResume()
  const summary = state.summary
  const [charCount, setCharCount] = useState(0)
  const maxChars = 600

  useEffect(() => {
    setCharCount(summary.content?.length || 0)
  }, [summary.content])

  const handleContentChange = (e) => {
    const newContent = e.target.value
    if (newContent.length <= maxChars) {
      dispatch({
        type: "UPDATE_SECTION",
        section: "summary",
        data: { content: newContent },
      })
    }
  }

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

        <div className="relative">
          <textarea
            value={summary.content}
            onChange={handleContentChange}
            placeholder="Write your professional summary here..."
            rows={8}
            className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-400">
            {charCount}/{maxChars}
          </div>
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
