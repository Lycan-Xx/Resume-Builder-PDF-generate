# Environment Setup Guide

## Firebase Configuration

This project uses Firebase for authentication and data storage. Your Firebase credentials are stored in environment variables for security.

### Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Get your Firebase credentials:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Select your project (or create a new one)
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Copy the configuration values

3. **Update `.env.local` with your credentials:**
   ```env
   VITE_FIREBASE_API_KEY=your_actual_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

### Important Notes

- **`.env.local`** - Contains your actual credentials (gitignored, safe to use)
- **`.env`** - Template with placeholders (committed to repo)
- **`.env.example`** - Example file for other developers (committed to repo)

### Security

✅ `.env.local` is automatically ignored by git (via `*.local` pattern in `.gitignore`)
✅ `.env` is also in `.gitignore` to prevent accidental commits
✅ Never commit files containing actual Firebase credentials

### Troubleshooting

If you see a warning about Firebase not being configured:
1. Make sure `.env.local` exists with your actual credentials
2. Restart your development server (`npm run dev`)
3. Check that all environment variables start with `VITE_` prefix (required by Vite)

### For Team Members

When cloning this repo:
1. Copy `.env.example` to `.env.local`
2. Ask the project owner for the Firebase credentials
3. Update `.env.local` with the provided credentials
4. Never commit `.env.local` or share credentials publicly
