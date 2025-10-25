"use client"
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building } from "lucide-react"
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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Briefcase className="w-6 h-6 text-primary-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No work experience added</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Add your professional experience to showcase your career journey
          </p>
          <button
            onClick={addExperience}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors mx-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Your First Experience</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.map((exp, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Experience {index + 1}</span>
                </div>
                <button
                  onClick={() => removeExperience(index)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Building className="w-4 h-4 inline mr-1" />
                    Company
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateExperience(index, "company", e.target.value)}
                    placeholder="Company Name"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateExperience(index, "position", e.target.value)}
                    placeholder="Job Title"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                    placeholder="City, State"
                    className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 inline mr-1" />
                      Start Date
                    </label>
                    <MonthYearPicker
                      value={exp.startDate}
                      onChange={(date) => updateExperience(index, "startDate", date)}
                      placeholder="Select start date"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">End Date</label>
                    <MonthYearPicker
                      value={exp.endDate}
                      onChange={(date) => updateExperience(index, "endDate", date)}
                      placeholder="Select end date"
                      disabled={exp.current}
                    />
                  </div>
                </div>
              </div>

              {/* Duration display */}
              {exp.startDate && (exp.endDate || exp.current) && (
                <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Duration: </span>
                  {formatMonthYear(exp.startDate)} - {exp.current ? 'Present' : formatMonthYear(exp.endDate)}
                  {' '}({calculateDuration(exp.startDate, exp.endDate, exp.current)})
                </div>
              )}

              <div className="mb-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) => updateExperience(index, "current", e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I currently work here</span>
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Job Description
                </label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(index, "description", e.target.value)}
                  placeholder="Describe your role and responsibilities..."
                  rows={3}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Key Achievements</label>
                  <button
                    onClick={() => addAchievement(index)}
                    className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                  >
                    + Add Achievement
                  </button>
                </div>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, achIndex) => (
                    <div key={achIndex} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <input
                        type="text"
                        value={achievement}
                        onChange={(e) => updateAchievement(index, achIndex, e.target.value)}
                        placeholder="Describe a key achievement..."
                        className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
                      />
                      {exp.achievements.length > 1 && (
                        <button
                          onClick={() => removeAchievement(index, achIndex)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
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
