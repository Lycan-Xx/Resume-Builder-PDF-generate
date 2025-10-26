"use client"
import { HiBriefcase, HiPlus, HiTrash, HiCalendar, HiMapPin, HiBuildingOffice2 } from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"
import MonthYearPicker from "../ui/MonthYearPicker"
import { formatMonthYear, calculateDuration } from "../../utils/dateUtils"

const ExperienceSection = () => {
  const { state, dispatch } = useResume()
  const experience = state.experience

  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [""],
    }
    dispatch({ type: "ADD_ITEM", section: "experience", item: newExperience })
  }

  const updateExperience = (index, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      section: "experience",
      index,
      data: { [field]: value },
    })
  }

  const removeExperience = (index) => {
    dispatch({ type: "REMOVE_ITEM", section: "experience", index })
  }

  const addAchievement = (expIndex) => {
    const exp = experience[expIndex]
    const updatedAchievements = [...exp.achievements, ""]
    updateExperience(expIndex, "achievements", updatedAchievements)
  }

  const updateAchievement = (expIndex, achIndex, value) => {
    const exp = experience[expIndex]
    const updatedAchievements = exp.achievements.map((ach, i) => (i === achIndex ? value : ach))
    updateExperience(expIndex, "achievements", updatedAchievements)
  }

  const removeAchievement = (expIndex, achIndex) => {
    const exp = experience[expIndex]
    const updatedAchievements = exp.achievements.filter((_, i) => i !== achIndex)
    updateExperience(expIndex, "achievements", updatedAchievements)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiBriefcase className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Work Experience</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 h-9 px-3 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
        >
          <HiPlus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiBriefcase className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No work experience added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Add your professional experience to showcase your career journey
          </p>
          <button
            onClick={addExperience}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 font-medium">Experience {index + 1}</span>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiBuildingOffice2 className="w-3.5 h-3.5 text-gray-500" />
                      Company
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Company Name"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">Position</label>
                    <input
                      type="text"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="Job Title"
                      className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                    <HiMapPin className="w-3.5 h-3.5 text-gray-500" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="City, State"
                    className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 flex items-center gap-1.5">
                      <HiCalendar className="w-3.5 h-3.5 text-gray-500" />
                      Start Date
                    </label>
                    <MonthYearPicker
                      value={exp.startDate}
                      onChange={(date) => updateExperience(index, "startDate", date)}
                      placeholder="Select start date"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300">End Date</label>
                    <MonthYearPicker
                      value={exp.endDate}
                      onChange={(date) => updateExperience(index, "endDate", date)}
                      placeholder="Select end date"
                      disabled={exp.current}
                    />
                  </div>
                </div>

                {/* Duration display */}
                {exp.startDate && (exp.endDate || exp.current) && (
                  <div className="text-xs text-gray-500 bg-[#111111] px-3 py-2 rounded-md border border-gray-800">
                    <span className="font-medium text-gray-400">Duration: </span>
                    {formatMonthYear(exp.startDate)} - {exp.current ? 'Present' : formatMonthYear(exp.endDate)}
                    {' '}({calculateDuration(exp.startDate, exp.endDate, exp.current)})
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`current-${index}`}
                    checked={exp.current}
                    onChange={(e) => updateExperience(index, "current", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-800 bg-[#111111] text-orange-500 focus:ring-orange-500 focus:ring-offset-0 focus:ring-1"
                  />
                  <label htmlFor={`current-${index}`} className="text-sm text-gray-300">I currently work here</label>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-300">
                    Job Description
                  </label>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your role and responsibilities..."
                    rows={3}
                    className="w-full px-3 py-2 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 resize-none transition-all"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">Key Achievements</label>
                    <button
                      onClick={() => addAchievement(index)}
                      className="text-xs text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      + Add Achievement
                    </button>
                  </div>
                  <div className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-gray-600 rounded-full mt-3 flex-shrink-0"></div>
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                          placeholder="Describe a key achievement..."
                          className="flex-1 h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
                        />
                        {exp.achievements.length > 1 && (
                          <button
                            onClick={() => removeAchievement(index, achIndex)}
                            className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all flex-shrink-0"
                          >
                            <HiTrash className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperienceSection