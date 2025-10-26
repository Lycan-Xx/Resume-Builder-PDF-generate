"use client"
import { HiAcademicCap, HiPlus, HiTrash, HiCalendar, HiMapPin, HiTrophy } from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"
import MonthYearPicker from "../ui/MonthYearPicker"
import { formatMonthYear, calculateDuration } from "../../utils/dateUtils"

const EducationSection = () => {
  const { state, dispatch } = useResume()
  const education = state.education

  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
      honors: "",
      description: "",
    }
    dispatch({ type: "ADD_ITEM", section: "education", item: newEducation })
  }

  const updateEducation = (index, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      section: "education",
      index,
      data: { [field]: value },
    })
  }

  const removeEducation = (index) => {
    dispatch({ type: "REMOVE_ITEM", section: "education", index })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiAcademicCap className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Education</h2>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiAcademicCap className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No education added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Add your educational background to showcase your qualifications
          </p>
          <button
            onClick={addEducation}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">Education {index + 1}</span>
                </div>
                <button
                  onClick={() => removeEducation(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Institution</label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                      placeholder="University Name"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Degree</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                      placeholder="Bachelor of Science"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(index, "fieldOfStudy", e.target.value)}
                      placeholder="Computer Science"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiMapPin className="w-3.5 h-3.5 text-gray-500" />
                      Location
                    </label>
                    <input
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(index, "location", e.target.value)}
                      placeholder="City, State"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiCalendar className="w-3.5 h-3.5 text-gray-500" />
                      Start Date
                    </label>
                    <MonthYearPicker
                      value={edu.startDate}
                      onChange={(date) => updateEducation(index, "startDate", date)}
                      placeholder="Select start date"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">End Date</label>
                    <MonthYearPicker
                      value={edu.endDate}
                      onChange={(date) => updateEducation(index, "endDate", date)}
                      placeholder="Select end date"
                    />
                  </div>
                </div>

                {/* Duration display */}
                {edu.startDate && edu.endDate && (
                  <div className="text-xs text-gray-500 bg-[#111111] px-3 py-2 rounded-md border border-gray-800">
                    <span className="font-medium text-gray-400">Duration: </span>
                    {formatMonthYear(edu.startDate)} - {formatMonthYear(edu.endDate)}
                    {' '}({calculateDuration(edu.startDate, edu.endDate)})
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                      placeholder="3.8/4.0"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiTrophy className="w-3.5 h-3.5 text-gray-500" />
                      Honors
                    </label>
                    <input
                      type="text"
                      value={edu.honors}
                      onChange={(e) => updateEducation(index, "honors", e.target.value)}
                      placeholder="Magna Cum Laude"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Description (Optional)
                  </label>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    placeholder="Relevant coursework, projects, or achievements..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 resize-none transition-all"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EducationSection