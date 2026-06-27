// src/templates/cleanMinimal.js
export const cleanMinimalTemplate = {
  id: 'clean-minimal',
  name: 'Clean Minimal',
  description: 'Clean, minimalist design matching professional standards',
  thumbnail: '/thumbnails/clean-minimal.png',

  colors: {
    primary: '#000000',
    secondary: '#2563eb',
    text: '#1a1a1a',
    lightText: '#4a4a4a',
    background: '#FFFFFF',
    sectionBg: '#f8f9fa',
    border: '#000000'
  },

  fonts: {
    header: 'Helvetica',
    body: 'Helvetica',
    sizes: {
      name: 22,
      headline: 11,
      sectionTitle: 12,
      jobTitle: 11,
      itemTitle: 11,
      body: 10,
      small: 9,
      contactInfo: 10
    }
  },

  spacing: {
    page: { top: 40, bottom: 40, left: 50, right: 50 },
    sectionMargin: 16,
    itemMargin: 12,
    headerMargin: 12,
    lineHeight: 1.4
  },

  layout: {
    type: 'single-column',
    headerBorderWidth: 0,
    sectionBorderWidth: 1,
    skillBorderWidth: 0,
    maxWidth: 850,
    // Custom rendering options for this template
    showSummaryTitle: false,
    skillsFormat: 'categorized',
    educationDateUppercase: true,
    projectUrlInline: true,
    bulletCharacter: '●',
    // Experience specific
    experienceDateFormat: 'mixed', // 'mixed' | 'uppercase' | 'lowercase'
    showDurationInExperience: true,
    companyTitleFormat: 'company-location-title', // 'title-company' | 'company-location-title'
    // Section title casing
    sectionTitleCase: 'title' // 'title' | 'uppercase' | 'lowercase'
  }
}
