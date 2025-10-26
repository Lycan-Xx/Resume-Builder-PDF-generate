"use client"

import { useState } from "react"
import { HiCodeBracket, HiPlus, HiTrash, HiStar } from "react-icons/hi2"
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
            <HiCodeBracket className="w-5 h-5 text-orange-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Skills</h2>
        </div>
      </div>

      {/* Add New Skill */}
      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
        <h3 className="text-sm font-medium text-gray-300 mb-4">Add New Skill</h3>
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              placeholder="e.g., JavaScript, Project Management"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
          </div>
          <div className="w-40 space-y-1.5">
            <label className="text-sm font-medium text-gray-300">Proficiency</label>
            <select
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) })}
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white transition-all"
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
            className="h-9 w-9 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200"
          >
            <HiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Skills List */}
      {skills.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiCodeBracket className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No skills added</h3>
          <p className="text-xs text-gray-500 mb-4">
            Add your technical and soft skills to showcase your expertise
          </p>
          <button
            onClick={addSkill}
            className="inline-flex items-center gap-2 h-9 px-4 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200 font-medium"
          >
            <HiPlus className="w-4 h-4" />
            Add Your First Skill
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, "name", e.target.value)}
                    className="w-full font-medium text-white bg-transparent border-none p-0 text-sm focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  onClick={() => removeSkill(index)}
                  className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-md transition-all"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {skillLevels.find((l) => l.value === skill.level)?.label}
                  </span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => updateSkill(index, "level", star)}
                        className={`transition-colors ${
                          star <= skill.level ? "text-orange-400" : "text-gray-700"
                        }`}
                      >
                        <HiStar className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-1.5 rounded-full transition-all duration-300"
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