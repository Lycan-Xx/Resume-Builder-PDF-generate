# ResumeForge - Professional Resume Builder

A modern, React-based resume builder application that allows users to create professional, ATS-friendly resumes with real-time PDF preview and multiple template options.

## Features

- **Real-time PDF Preview**: See your resume as you build it
- **Multiple Templates**: Choose from professional, modern, and minimalist designs
- **Comprehensive Sections**: Support for all resume sections including experience, education, skills, projects, certifications, and more
- **Template Customization**: Dynamic styling with customizable colors, fonts, and layouts
- **Dark Mode Support**: Built-in theme switching
- **Local Storage**: Auto-save your progress
- **Export to PDF**: Download your resume as a PDF file

## Tech Stack

- **React** - UI library
- **React Router** - Navigation
- **@react-pdf/renderer** - PDF generation
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

## Project Structure

```
.
├── public/
│   ├── fonts/                    # Custom fonts for PDF rendering
│   │   ├── roboto-mono-*.woff
│   │   └── arimo-*.woff
│   └── favicon.svg
├── src/
│   ├── components/               # UI Components
│   │   ├── sections/            # Form sections for resume data input
│   │   │   ├── BasicsSection.jsx
│   │   │   ├── EducationSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   ├── LanguagesSection.jsx
│   │   │   ├── SkillsSection.jsx
│   │   │   └── SummarySection.jsx
│   │   ├── AwardsSection.jsx
│   │   ├── CertificationsSection.jsx
│   │   ├── InterestsSection.jsx
│   │   ├── ManageSectionsModal.jsx
│   │   ├── Navbar.jsx
│   │   ├── PersonalInfoSection.jsx
│   │   ├── PreviewModal.jsx
│   │   ├── ProfilesSection.jsx
│   │   ├── ProgressNavbar.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── PublicationsSection.jsx
│   │   ├── ReferencesSection.jsx
│   │   ├── ResumePDF.jsx          # PDF generation component
│   │   ├── SectionsNavbar.jsx
│   │   ├── TemplateSelector.jsx
│   │   └── VolunteeringSection.jsx
│   ├── contexts/                 # React Context providers
│   │   ├── ResumeContext.jsx     # Resume data state management
│   │   └── ThemeContext.jsx      # Theme state management
│   ├── lib/
│   │   └── utils.ts              # Utility functions
│   ├── pages/                    # Page components
│   │   ├── HomePage.jsx
│   │   └── ResumeBuilder.jsx     # Main resume builder page
│   ├── templates/                # PDF template configurations
│   │   ├── index.js
│   │   ├── minimalist.js
│   │   ├── modernBlue.js
│   │   └── professionalRed.js
│   ├── App.jsx                   # Main app component with routing
│   ├── fonts.js                  # Font registration for PDF
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Component Architecture

### Core Components

#### 1. **App.jsx**
- Sets up React Router with two main routes: home and builder
- Wraps the application with ThemeProvider
- Provides ResumeProvider to the builder route

#### 2. **ResumeBuilder.jsx**
- Main page where users build their resume
- Contains two panels: form inputs (left) and PDF preview (right)
- Manages active section state and tab switching (Content/Template)
- Responsive design with mobile preview toggle

#### 3. **ResumePDF.jsx**
- Generates PDF using `@react-pdf/renderer`
- Receives resume data and template ID as props
- Dynamically applies template styles
- Renders all resume sections based on available data
- Supports both single-column and two-column layouts

### Section Components

Located in `src/components/` and `src/components/sections/`:

- **BasicsSection**: Personal information (name, email, phone, location, website)
- **SummarySection**: Professional summary/objective
- **ExperienceSection**: Work experience with achievements
- **EducationSection**: Educational background
- **SkillsSection**: Technical and soft skills with proficiency levels
- **ProjectsSection**: Personal/professional projects
- **LanguagesSection**: Language proficiency
- **CertificationsSection**: Professional certifications
- **AwardsSection**: Awards and recognitions
- **PublicationsSection**: Published works
- **VolunteeringSection**: Volunteer experience
- **InterestsSection**: Personal interests and hobbies
- **ReferencesSection**: Professional references
- **ProfilesSection**: Social media and professional profiles

### Context Providers

#### ResumeContext
- Manages all resume data using useReducer
- Provides actions for CRUD operations on resume sections
- Auto-saves to localStorage with debouncing
- Loads saved data on mount

#### ThemeContext
- Manages dark/light theme state
- Persists theme preference to localStorage

### Templates

Templates define the visual styling of the PDF output:

- **professionalRed**: Clean design with red accents
- **modernBlue**: Contemporary design with blue gradients
- **minimalist**: Simple and elegant with subtle accents

Each template includes:
- Color scheme (primary, secondary, text, background)
- Font configuration (family, sizes)
- Spacing (margins, padding, line height)
- Layout type (single-column or two-column)

## Data Flow

1. User inputs data in section components
2. Components dispatch actions to ResumeContext
3. ResumeContext updates state and saves to localStorage
4. ResumePDF component receives updated state
5. PDF is re-rendered with new data and selected template

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd pdf-generate

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Development

### Adding a New Section

1. Create a new component in `src/components/`
2. Add the section to `ResumeContext` initial state
3. Create a render function in `ResumePDF.jsx`
4. Add the section to `sectionComponents` in `ResumeBuilder.jsx`
5. Update the sections navbar

### Creating a New Template

1. Create a new file in `src/templates/`
2. Define colors, fonts, spacing, and layout
3. Export the template object
4. Import and add to `templates` object in `src/templates/index.js`

## Known Issues & Fixes

- **Skills Section**: Uses array of objects `[{name, level}]` format
- **Interests Section**: Uses array of objects `[{name, description}]` format
- **Border Radius Error**: Fixed by adding `borderRadius: 0` and fallback checks for template properties
- **Font Sizes**: Standardized to 15px for section titles, 11px for dates

## Future Enhancements

- User authentication with Firebase
- Cloud storage for resumes
- More template options
- Export to Word format
- Resume analytics and ATS scoring
- Collaborative editing

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
