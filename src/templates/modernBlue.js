// src/templates/modernBlue.js
export const modernBlueTemplate = {
  id: 'modern-blue',
  name: 'Modern Blue',
  description: 'Contemporary design with blue gradients',
  
  colors: {
    primary: '#667eea',
    secondary: '#764ba2',
    text: '#2c3e50',
    lightText: '#5a6c7d',
    background: '#FFFFFF',
    sectionBg: '#f8f9fa',
    border: '#667eea'
  },
  
  fonts: {
    header: 'Roboto Mono',
    body: 'Roboto Mono',
    sizes: {
      name: 36,
      headline: 16,
      sectionTitle: 15,
      jobTitle: 17,
      body: 10,
      small: 12,
      contactInfo: 10
    }
  },
  
  spacing: {
    page: { top: 40, bottom: 40, left: 50, right: 50 },
    sectionMargin: 35,
    itemMargin: 28,
    lineHeight: 1.6
  },
  
  layout: {
    type: 'single-column', // or 'two-column'
    headerBorderWidth: 3,
    sectionBorderWidth: 2,
    maxWidth: 850
  }
}
