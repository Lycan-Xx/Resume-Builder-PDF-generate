"use client"

import { useState } from "react"
import { HiGlobeAlt, HiPlus, HiXMark } from "react-icons/hi2"
import { useResume } from "../../contexts/ResumeContext"

const LanguagesSection = () => {
  const { state, dispatch } = useResume()
  const languages = state.languages
  const [newLanguage, setNewLanguage] = useState({ name: "", proficiency: "intermediate" })

  const addLanguage = () => {
    if (newLanguage.name.trim()) {
      dispatch({ type: "ADD_ITEM", section: "languages", item: newLanguage })
      setNewLanguage({ name: "", proficiency: "intermediate" })
    }
  }

  const updateLanguage = (index, field, value) => {
    dispatch({
      type: "UPDATE_ITEM",
      section: "languages",
      index,
      data: { [field]: value },
    })
  }

  const removeLanguage = (index) => {
    dispatch({ type: "REMOVE_ITEM", section: "languages", index })
  }

  const proficiencyLevels = [
    { value: "elementary", label: "Elementary" },
    { value: "limited", label: "Limited Working" },
    { value: "intermediate", label: "Professional Working" },
    { value: "advanced", label: "Full Professional" },
    { value: "native", label: "Native/Bilingual" },
  ]

  const getProficiencyColor = (level) => {
    const colors = {
      elementary: "bg-red-500",
      limited: "bg-orange-500",
      intermediate: "bg-yellow-500",
      advanced: "bg-blue-500",
      native: "bg-green-500",
    }
    return colors[level] || "bg-gray-500"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center">
          <HiGlobeAlt className="w-5 h-5 text-orange-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Languages</h2>
      </div>

      {/* Add New Language */}
      <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Add New Language</h3>
        <div className="flex items-end gap-3">
          <div className="flex-1 space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Language</label>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="e.g., Spanish, Mandarin"
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-gray-600 transition-all"
              onKeyPress={(e) => e.key === "Enter" && addLanguage()}
            />
          </div>
          <div className="w-44 space-y-1.5">
            <label className="text-xs font-medium text-gray-400">Proficiency</label>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="w-full h-9 px-3 text-sm bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white transition-all"
            >
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={addLanguage}
            className="h-9 w-9 flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-md transition-all duration-200"
          >
            <HiPlus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Languages List */}
      {languages.length === 0 ? (
        <div className="text-center py-12 bg-[#0a0a0a] rounded-lg border border-dashed border-gray-800">
          <div className="w-12 h-12 rounded-full bg-gray-800/50 flex items-center justify-center mx-auto mb-3">
            <HiGlobeAlt className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="text-sm font-medium text-white mb-1">No languages added</h3>
          <p className="text-xs text-gray-500">
            Add languages you speak to showcase your communication abilities
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((language, index) => (
            <div
              key={index}
              className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800"
            >
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) => updateLanguage(index, "name", e.target.value)}
                  className="font-medium text-white bg-transparent border-none p-0 focus:ring-0 flex-1 text-sm"
                />
                <button
                  onClick={() => removeLanguage(index)}
                  className="p-1 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
                >
                  <HiXMark className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <select
                  value={language.proficiency}
                  onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                  className="w-full h-8 px-3 text-xs bg-[#111111] border border-gray-800 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 text-white transition-all"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getProficiencyColor(language.proficiency)}`} />
                  <span className="text-xs text-gray-500">
                    {proficiencyLevels.find((l) => l.value === language.proficiency)?.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguagesSection