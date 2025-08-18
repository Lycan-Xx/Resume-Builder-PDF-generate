"use client"

import { useState } from "react"
import { Code, Plus, X, Star } from "lucide-react"
import { useResume } from "../../contexts/ResumeContext"

const SkillsSection = () => {
  const { state, dispatch } = useResume()
  const skills = state.skills
  const [newSkill, setNewSkill] = useState({ name: "", level: 3 })

  const addSkill = () => {
    if (newSkill.name.trim()) {
      dispatch({ type: "ADD_ITEM", section: "skills", item: newSkill })
      setNewSkill({ name: "", level: 3 })
    }
  }

  const updateSkill = (index, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      section: "skills",
      index,
      data: { [field]: value },
    })
  }

  const removeSkill = (index) => {
    dispatch({ type: "REMOVE_ITEM", section: "skills", index })
  }

  const skillLevels = [
    { value: 1, label: "Beginner" },
    { value: 2, label: "Novice" },
    { value: 3, label: "Intermediate" },
    { value: 4, label: "Advanced" },
    { value: 5, label: "Expert" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Code className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
      </div>

      {/* Add New Skill */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Skill</h3>
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g., JavaScript, Project Management"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
          </div>
          <div className="w-40">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proficiency Level</label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
            >
              {skillLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skills List */}
      {skills.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No skills added</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Add your technical and soft skills to showcase your expertise
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    className="w-full font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0"
                  />
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skillLevels.find((l) => l.value === skill.level)?.label}
                  </span>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => updateSkill(index, "level", star)}
                        className={`transition-colors ${
                          star <= skill.level ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(skill.level / 5) * 100}%` }}
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

export default SkillsSection
