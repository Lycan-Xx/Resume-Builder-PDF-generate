# ResumeForge

A modern, offline-first resume builder with real-time PDF preview, cloud sync, and multiple professional templates.

## What It Is

ResumeForge is a web-based resume builder that helps you create professional, ATS-friendly resumes with ease. Build your resume once, access it anywhere, and export to PDF instantly.

## Key Features

- **Real-time PDF Preview** - See your resume as you build it
- **Multiple Templates** - Professional, Modern, and Minimalist designs
- **Cloud Sync** - Save up to 3 resumes with Google Sign-In
- **Offline-First** - Build resumes without internet, sync when back online
- **Resume Stash** - Manage multiple resumes with a sleek side panel
- **Auto-Save** - Never lose your work with automatic local and cloud backup
- **Mobile Responsive** - Build resumes on any device

## Tech Stack

**Frontend**

- React 18 + Vite
- React Router for navigation
- Tailwind CSS for styling
- @react-pdf/renderer for PDF generation

**Backend & Services**

- Firebase Authentication (Google Sign-In)
- Firestore for cloud storage
- LocalStorage for offline persistence

**State Management**

- React Context API
- Custom sync service with offline queue

## Getting Started

### Prerequisites

- Node.js 16+
- Firebase project (for authentication)

### Installation

```bash
# Clone the repository
git clone https://github.com/Lycan-Xx/Resume-Builder-PDF-generate.git
cd Resume-Builder-PDF-generate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase credentials to .env.local

# Start development server
npm run dev
```

### Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Google Authentication
3. Create a Firestore database
4. Copy your Firebase config to `.env.local`
5. Deploy Firestore rules from `firestore.rules`

See [FIRESTORE_SETUP_INSTRUCTIONS.md](FIRESTORE_SETUP_INSTRUCTIONS.md) for detailed setup.

## How It Works

### Architecture

```
User Input → ResumeContext → LocalStorage + Firestore
                ↓
         Real-time PDF Preview
```

**Offline-First Sync**

- Changes saved locally first
- Queued for cloud sync when online
- Last-write-wins conflict resolution
- Auto-sync every 5 seconds

**Resume Management**

- Create up to 3 free resumes
- Each resume stored separately
- Switch between resumes via Stash Panel
- Delete resumes with confirmation

### Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, navigation
│   ├── modals/          # Dialogs and modals
│   ├── pdf/             # PDF generation
│   └── sections/        # Resume section forms
├── contexts/            # State management
├── services/            # Firestore & sync logic
├── hooks/               # Custom React hooks
├── pages/               # Route pages
└── templates/           # PDF templates
```

## Challenges Encountered

### 1. **Offline Sync Complexity**

- **Problem**: Managing resume edits across devices while offline
- **Solution**: Implemented queue-based sync service with timestamp comparison

### 2. **PDF Generation Performance**

- **Problem**: Large resumes caused slow rendering
- **Solution**: Debounced state updates (800ms) and memoized PDF viewer

### 3. **Resume Limit Enforcement**

- **Problem**: Limit check triggered on every save, including updates
- **Solution**: Check Firestore document existence before enforcing limit

### 4. **Mobile UX**

- **Problem**: Desktop-focused UI didn't work on mobile
- **Solution**: Responsive stash panel, mobile-optimized dialogs, touch-friendly buttons

### 5. **State Synchronization**

- **Problem**: Local and cloud data getting out of sync
- **Solution**: Single source of truth with bidirectional sync on login

## Future Plans

- [ ] **Premium Features** - Unlimited resumes, advanced templates
- [ ] **AI Suggestions** - Content recommendations for each section
- [ ] **ATS Scoring** - Real-time resume optimization tips
- [ ] **Export Formats** - Word, JSON, Markdown
- [ ] **Collaborative Editing** - Share resumes for feedback
- [ ] **Version History** - Restore previous versions
- [ ] **Custom Templates** - User-created template builder
- [ ] **Resume Analytics** - Track views and downloads

## Contributing

Contributions are welcome! Here's how:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code style
   - Add comments for complex logic
   - Test on mobile and desktop
4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Development Guidelines

- Use functional components with hooks
- Follow the existing folder structure
- Add PropTypes or TypeScript types
- Test offline functionality
- Ensure mobile responsiveness

## License

This project is licensed under the [Boost Software License 1.0](LICENSE) - see the LICENSE file for details.

## Contact

**Mohammad Bello** (Lycan_Xx)

- Email: [msbello@cc.cc](mailto:msbello@cc.cc)
- Twitter: [@LycanXx0](https://x.com/LycanXx0)
- LinkedIn: [mohammad-bello](https://linkedin.com/in/mohammad-bello/)
- GitHub: [@Lycan-Xx](https://github.com/Lycan-Xx)

## Acknowledgments

- Built with ❤️ using React and Firebase
- Icons by [Lucide](https://lucide.dev) and [Heroicons](https://heroicons.com)
- Fonts by Google Fonts

---

**Star ⭐ this repo if you find it helpful!**
