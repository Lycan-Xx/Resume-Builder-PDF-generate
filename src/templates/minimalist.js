export const minimalistTemplate = {
  id: 'minimalist',
  name: 'Minimalist',
  description: 'Simple and elegant design with subtle accents',
  thumbnail: '/thumbnails/minimalist.png',
  
  colors: {
    primary: '#000000',
    secondary: '#374151',
    text: '#000000',
    lightText: '#6B7280',
    background: '#FFFFFF',
    sectionBg: '#FFFFFF',
    border: '#E5E7EB'
  },
  
  fonts: {
    header: 'Roboto Mono',
    body: 'Roboto Mono',
    sizes: {
      name: 28,
      headline: 13,
      sectionTitle: 15,
      jobTitle: 13,
      body: 10,
      small: 10,
      contactInfo: 10
    }
  },
  
  spacing: {
    page: { top: 50, bottom: 50, left: 60, right: 60 },
    sectionMargin: 30,
    itemMargin: 22,
    headerMargin: 25,
    lineHeight: 1.5
  },
  
  layout: {
    type: 'single-column',
    headerBorderWidth: 0,
    sectionBorderWidth: 1,
    skillBorderWidth: 0
  }
}
