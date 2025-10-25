import { Font } from '@react-pdf/renderer'

// Register Roboto font using Fontsource (provides TTF files that work with react-pdf)
Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdn.jsdelivr.net/fontsource/roboto/400.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/roboto/500.ttf',
      fontWeight: 500,
    },
    {
      src: 'https://cdn.jsdelivr.net/fontsource/roboto/700.ttf',
      fontWeight: 700,
    },
  ],
})

// Register other common system fonts that might be used as fallbacks
Font.register({
  family: 'Arial',
  src: 'https://cdn.jsdelivr.net/fontsource/arimo/400.ttf',
})

Font.register({
  family: 'Times New Roman',
  src: 'https://cdn.jsdelivr.net/fontsource/crimson-text/400.ttf',
})

// Ensure Helvetica is properly registered (it should be built-in, but let's make sure)
Font.register({
  family: 'Helvetica',
  src: 'https://cdn.jsdelivr.net/fontsource/arimo/400.ttf', // Fallback
})

Font.register({
  family: 'Helvetica-Bold',
  src: 'https://cdn.jsdelivr.net/fontsource/arimo/700.ttf',
  fontWeight: 'bold',
})
