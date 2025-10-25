// src/templates/professionalRed.js
export const professionalRedTemplate = {
  id: 'professional-red',
  name: 'Professional (Red Accent)',
  description: 'Clean black and white with red accents',
  thumbnail: '/thumbnails/professional-red.png',
  
  colors: {
    primary: '#E74C3C',        // Red for name and headers
    secondary: '#0066CC',       // Blue for links
    text: '#000000',
    lightText: '#666666',
    background: '#FFFFFF',
    sectionBg: '#F5F5F5',
    border: '#000000'
  },
  
  fonts: {
    header: 'Roboto',
    body: 'Roboto',
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
