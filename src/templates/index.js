// src/templates/index.js
import { professionalRedTemplate } from './professionalRed'
import { modernBlueTemplate } from './modernBlue'
import { minimalistTemplate } from './minimalist'

export const templates = {
  'professional-red': professionalRedTemplate,
  'modern-blue': modernBlueTemplate,
  'minimalist': minimalistTemplate
}

export const templatesList = Object.values(templates)

export const getTemplate = (templateId) => {
  return templates[templateId] || professionalRedTemplate
}