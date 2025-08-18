"use client"

import { useState } from "react"
import { Globe, Plus, X } from "lucide-react"
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
      <div className="flex items-center space-x-3">
        <Globe className="w-6 h-6 text-primary-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Languages</h2>
      </div>

      {/* Add New Language */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Language</h3>
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
            <input
              type="text"
              value={newLanguage.name}
              onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
              placeholder="e.g., Spanish, Mandarin"
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
              onKeyPress={(e) => e.key === "Enter" && addLanguage()}
            />
          </div>
          <div className="w-48">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Proficiency</label>
            <select
              value={newLanguage.proficiency}
              onChange={(e) => setNewLanguage({ ...newLanguage, proficiency: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white"
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
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors btn-hover"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Languages List */}
      {languages.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No languages added</h3>
          <p className="text-gray-500 dark:text-gray-400">
            Add languages you speak to showcase your communication abilities
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map((language, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              <div className="flex items-start justify-between mb-3">
                <input
                  type="text"
                  value={language.name}
                  onChange={(e) => updateLanguage(index, "name", e.target.value)}
                  className="font-medium text-gray-900 dark:text-white bg-transparent border-none p-0 focus:ring-0 flex-1"
                />
                <button
                  onClick={() => removeLanguage(index)}
                  className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <select
                  value={language.proficiency}
                  onChange={(e) => updateLanguage(index, "proficiency", e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-gray-900 dark:text-white text-sm"
                >
                  {proficiencyLevels.map((level) => (
                    <option key={level.value} value={level.value}>
                      {level.label}
                    </option>
                  ))}
                </select>

                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getProficiencyColor(language.proficiency)}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
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
