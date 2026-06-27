"use client"

import { useState } from "react"
import { useResume } from "../../contexts/ResumeContext"
import { HiPlus, HiTrash } from "react-icons/hi2"

const AdditionalInfoSection = () => {
  const { state, dispatch } = useResume()
  const [newItem, setNewItem] = useState("")

  const items = state.additionalInfo || []

  const addItem = () => {
    if (!newItem.trim()) return
    dispatch({
      type: "ADD_ITEM",
      section: "additionalInfo",
      item: { text: newItem.trim() },
    })
    setNewItem("")
  }

  const removeItem = (index) => {
    dispatch({
      type: "REMOVE_ITEM",
      section: "additionalInfo",
      index,
    })
  }

  const updateItem = (index, text) => {
    dispatch({
      type: "UPDATE_ITEM",
      section: "additionalInfo",
      index,
      data: { text },
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Additional Information</h3>
        <span className="text-sm text-gray-400">{items.length} items</span>
      </div>

      {/* Add new item */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addItem()}
          placeholder="e.g., Passionate about open-source communities"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
        />
        <button
          onClick={addItem}
          disabled={!newItem.trim()}
          className="px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
        >
          <HiPlus className="w-5 h-5" />
        </button>
      </div>

      {/* List of items */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-gray-800/50 border border-gray-700 rounded-lg p-3"
          >
            <input
              type="text"
              value={item.text || ""}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 bg-transparent text-white focus:outline-none"
            />
            <button
              onClick={() => removeItem(index)}
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              <HiTrash className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">
          No additional information added yet.
        </p>
      )}
    </div>
  )
}

export default AdditionalInfoSection
