"use client"
import { HiDocumentText, HiLightBulb } from "react-icons/hi2"
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
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <HiDocumentText className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Professional Summary</h2>
      </div>

      {/* Content */}
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          Write a compelling summary that highlights your key achievements, skills, and career objectives.
        </p>

        <div className="relative">
          <textarea
            value={summary.content}
            onChange={handleContentChange}
            placeholder="Write your professional summary here..."
            rows={8}
            className="w-full px-3 py-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 resize-none transition-all"
          />
          <div className="absolute bottom-3 right-3 text-xs text-gray-500">
            {charCount}/{maxChars}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
          <div className="flex items-center gap-2 mb-3">
            <HiLightBulb className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-gray-300">Pro Tips</span>
          </div>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Keep it concise (2-4 sentences)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Highlight your most relevant achievements</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Include keywords from your target job</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400 mt-0.5">•</span>
              <span>Show your value proposition</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SummarySection