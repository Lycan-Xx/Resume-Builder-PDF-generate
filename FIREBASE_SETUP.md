# Firebase Authentication Setup Guide

## What I've Done

I've set up the Firebase authentication infrastructure for your ResumeForge app. Here's what's been implemented:

### Files Created:

1. **src/config/firebase.js** - Firebase configuration and initialization
2. **src/contexts/AuthContext.jsx** - Authentication context provider
3. **.env.example** - Template for environment variables

### Files Updated:

1. **src/App.jsx** - Wrapped with AuthProvider
2. **src/pages/HomePage.jsx** - Added auth integration with loading states

## Next Steps for You:

### 1. Install Firebase Dependencies

```bash
npm install firebase
```

### 2. Create .env File

Create a `.env` file in your project root (copy from `.env.example`):

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Get Firebase Config Values

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Click the gear icon ⚙️ → Project Settings
4. Scroll down to "Your apps" section
5. If you haven't added a web app, click "Add app" → Web (</>) icon
6. Copy the config values and paste them into your `.env` file

### 4. Update ExportPage

The ExportPage needs the same auth button. Add this code:

```jsx
import { useAuth } from "../contexts/AuthContext";

// In component:
const { user, signingIn, signInWithGoogle } = useAuth();

const handleAuthClick = async () => {
  if (user) {
    navigate("/profile");
  } else {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }
};

// Replace the existing sign-in button with the same code from HomePage
```

### 5. Update ProfilePage

Replace the ProfilePage content with:

```jsx
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    avatar: "",
    fullName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        avatar: user.photoURL || "",
        fullName: user.displayName || "",
        username: user.username || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    navigate("/");
    return null;
  }

  // Rest of your ProfilePage code...
  // Add a Sign Out button somewhere in the UI
};
```

## Features Implemented:

### HomePage Button States:
- **Not signed in**: Shows "Sign in to save your resume" with Google icon
- **Signing in**: Shows spinner animation with "Signing in..." text
- **Signed in**: Shows "Welcome, [FirstName]" with user's profile picture

### Loading Animation:
- Spinning circle animation appears when OAuth is triggered
- Button is disabled during sign-in process
- Animation stops when auth completes or fails

### Mobile Responsive:
- Desktop: Full text "Sign in to save your resume"
- Mobile: Shorter text "Sign in to save"
- Both versions show user info when logged in

## Testing:

1. Start your dev server: `npm run dev`
2. Click the sign-in button
3. Complete Google OAuth
4. Button should update to show "Welcome, [YourName]"
5. Click again to go to profile page

## Troubleshooting:

### "Firebase not configured" error:
- Make sure `.env` file exists with correct values
- Restart dev server after creating `.env`

### "redirect_uri_mismatch" error:
- Add `http://localhost:5173` to Firebase authorized domains
- Add to Google Cloud Console OAuth client

### User data not showing:
- Check browser console for errors
- Verify Firebase Authentication is enabled in Firebase Console

## Security Notes:

- Never commit `.env` file to git (it's in `.gitignore`)
- Firebase API keys are safe to expose in frontend code
- Use Firebase Security Rules to protect Firestore data

## Next Features to Implement:

1. Save resume data to Firestore when user is logged in
2. Load user's saved resumes from Firestore
3. Add sign-out button in ProfilePage
4. Implement account deletion functionality
5. Add privacy policy link functionality

Let me know if you need help with any of these steps!
