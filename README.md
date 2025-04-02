README


Open your terminal, navigate to the directory where you saved generate_resume.py, and run:

python generate_resume.py

This will generate a PDF file named Updated-Developer-Resume.pdf in the same directory.


## Project Context (Version 2)

### Project Overview

This project is a React-based resume builder application. It allows users to input their personal information, education, experience, skills, and projects, and then generates a PDF resume based on that data. It uses React Router for navigation and `@react-pdf/renderer` to generate the PDF. It also uses Tailwind CSS for styling.

### File Structure

```
.
├── .gitignore              # Specifies intentionally untracked files that Git should ignore.
├── eslint.config.js        # Configuration file for ESLint, a JavaScript linter.
├── generate.py             # A Python script to generate a sample resume PDF (likely for testing or demonstration purposes, not part of the React app).
├── index.html              # The main HTML file that loads the React application.
├── package.json            # Contains metadata about the project, including dependencies and scripts.
├── postcss.config.js       # Configuration file for PostCSS, a tool for transforming CSS.
├── README.md               # A file containing information about the project.
├── tailwind.config.js      # Configuration file for Tailwind CSS.
├── vite.config.js          # Configuration files for Vite, a build tool.
├── vite.config.ts          # Configuration files for Vite, a build tool.
└── src                     # Contains the source code for the React application.
```

### `src` Directory Breakdown

```
src/
├── App.jsx                 # The main application component. It sets up the React Router and the ResumeProvider.
├── components/           # Contains reusable UI components.
│   ├── EducationSection.jsx   # Component for inputting and displaying education information.
│   ├── ExperienceSection.jsx  # Component for inputting and displaying work experience information.
│   ├── PersonalInfoSection.jsx# Component for inputting and displaying personal information (name, contact details, etc.).
│   ├── ProjectsSection.jsx    # Component for inputting and displaying project information.
│   ├── ResumePDF.jsx          # Component that uses `@react-pdf/renderer` to generate the PDF document.
│   └── SkillsSection.jsx      # Component for inputting and displaying skills (technical and soft).
├── context/              # Contains the ResumeContext for managing the resume data.
│   └── ResumeContext.jsx    # Defines the ResumeContext, ResumeProvider, and useResume hook for accessing and updating the resume data.
├── index.css               # Global CSS file.
├── main.jsx                # Entry point for the React application. It renders the App component into the root element in index.html.
└── pages/                # Contains components that represent different pages in the application.
	├── HomePage.jsx         # The home page of the application.
	└── ResumeBuilder.jsx    # The main page where users build their resume.
```

### Component Logic and Nesting

1.  **`App.jsx`**:
	*   **Purpose**: Sets up the React Router and provides the `ResumeContext` to the entire application.
	*   **Logic**:
		*   Uses `createBrowserRouter` from `react-router-dom` to define the application's routes.
		*   The main route renders a `RootLayout` component wrapped with `ResumeProvider`.
		*   `RouterProvider` makes the router available to the application.
	*   **Nesting**:
		*   `RouterProvider` wraps the entire application.
		*   `ResumeProvider` wraps the `RootLayout` and its children.
		*   `RootLayout` renders the navigation and an `<Outlet />` for the current page.
	*   **Highlight**: The `ResumeProvider` makes the resume data and update functions available to all components within the application.

2.  **`RootLayout`**:
	*   **Purpose**: Provides the basic layout for all pages, including the navigation bar.
	*   **Logic**:
		*   Renders a navigation bar with a link to the home page.
		*   Uses `<Outlet />` from `react-router-dom` to render the content of the current route.
	*   **Nesting**:
		*   Wraps the navigation and the page content.
	*   **Highlight**: Provides a consistent look and feel across all pages.

3.  **`pages/HomePage.jsx`**:
	*   **Purpose**: Displays the home page content.
	*   **Logic**:
		*   Contains the main content for the home page.
	*   **Nesting**:
		*   Rendered within the `<Outlet />` of the `RootLayout`.

4.  **`pages/ResumeBuilder.jsx`**:
	*   **Purpose**: The main resume building page.
	*   **Logic**:
		*   Uses the `useResume` hook to access the resume data and update functions from the `ResumeContext`.
		*   Renders the `PersonalInfoSection`, `EducationSection`, `ExperienceSection`, `SkillsSection`, and `ProjectsSection` components.
		*   Includes a `PDFDownloadLink` component to generate and download the resume as a PDF.
	*   **Nesting**:
		*   Rendered within the `<Outlet />` of the `RootLayout`.
		*   Contains the input sections for the resume data.
	*   **Highlight**: This is where the user interacts with the application to build their resume.

5.  **`components/*Section.jsx` (e.g., `PersonalInfoSection.jsx`, `EducationSection.jsx`)**:
	*   **Purpose**: Provide input fields for specific sections of the resume.
	*   **Logic**:
		*   Use the `useResume` hook to access the resume data and update functions.
		*   Render input fields for the corresponding data.
		*   Dispatch actions to update the resume data in the `ResumeContext` when the input fields change.
	*   **Nesting**:
		*   Rendered within the `ResumeBuilder` component.
	*   **Highlight**: These components handle the user input and update the resume data.

6.  **`components/ResumePDF.jsx`**:
	*   **Purpose**: Generates the PDF document using `@react-pdf/renderer`.
	*   **Logic**:
		*   Receives the resume data as props.
		*   Uses the `Document`, `Page`, `View`, and `Text` components from `@react-pdf/renderer` to define the structure and content of the PDF document.
		*   Styles the PDF document using `StyleSheet`.
	*   **Nesting**:
		*   Rendered within the `PDFDownloadLink` component in `ResumeBuilder.jsx`.
	*   **Highlight**: This component is responsible for generating the final PDF output.

7.  **`context/ResumeContext.jsx`**:
	*   **Purpose**: Manages the resume data using React Context and a reducer.
	*   **Logic**:
		*   Defines the `initialState` for the resume data.
		*   Creates a `resumeReducer` function to handle actions and update the state.
		*   Creates a `ResumeContext` using `createContext`.
		*   Provides the `ResumeContext` to the application using `ResumeProvider`.
		*   Creates a `useResume` hook to access the context value.
	*   **Nesting**:
		*   The `ResumeProvider` wraps the `RootLayout` in `App.jsx`.
	*   **Highlight**: This context provides a centralized way to manage the resume data and make it available to all components in the application.

### Data Flow

1.  The user interacts with the input fields in the `*Section.jsx` components.
2.  The `onChange` event handlers in the input fields dispatch actions to the `resumeReducer` in `ResumeContext.jsx`.
3.  The `resumeReducer` updates the resume data in the `ResumeContext`.
4.  The `ResumeBuilder.jsx` component uses the `useResume` hook to access the updated resume data.
5.  When the user clicks the "Download PDF" button, the `PDFDownloadLink` component renders the `ResumePDF.jsx` component with the current resume data as props.
6.  The `ResumePDF.jsx` component generates the PDF document using `@react-pdf/renderer`.
7.  The `PDFDownloadLink` component downloads the PDF document.

### Key Technologies

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** A library for handling navigation in React applications.
*   **@react-pdf/renderer:** A library for generating PDF documents in React.
*   **Tailwind CSS:** A utility-first CSS framework for styling the application.
*   **Vite:** A build tool that provides a fast and efficient development experience.
*   **ESLint:** A JavaScript linter for identifying and fixing code quality issues.

This overview should provide a solid foundation for understanding the project structure and component logic. Good luck!



## Features to add

- Sign up and sign in with google - also implement a firebase backend
- 