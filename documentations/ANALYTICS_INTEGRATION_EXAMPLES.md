# Analytics Integration Examples

## How to Add Analytics to Your Components

### Example 1: Track Resume Creation (HomePage)

```javascript
import { analyticsService } from "../services/analytics.service";

const handleConfirmResumeName = async (name) => {
  // ... existing code ...

  // Track analytics
  analyticsService.trackResumeCreated(name);

  // ... rest of code ...
};
```

### Example 2: Track Template Changes (TemplateSelector)

```javascript
import { analyticsService } from "../../services/analytics.service";

const handleTemplateSelect = (templateId) => {
  dispatch({ type: "SET_TEMPLATE", template: templateId });

  // Track analytics
  const template = templatesList.find((t) => t.id === templateId);
  analyticsService.trackTemplateChanged(templateId, template?.name);
};
```

### Example 3: Track Section Editing (SectionsNavbar)

```javascript
import { analyticsService } from "../../services/analytics.service";

const handleSectionChange = (sectionId) => {
  onSectionChange(sectionId);

  // Track analytics
  analyticsService.trackSectionEdited(sectionId);
};
```

### Example 4: Track PDF Download (ExportPage)

```javascript
import { analyticsService } from "../services/analytics.service";

const handleModalDownload = () => {
  if (downloadLinkRef.current) {
    downloadLinkRef.current.click();

    // Track analytics
    analyticsService.trackResumeDownloaded(fileName);
  }
  setShowThankYouModal(false);
};
```

### Example 5: Track Page Views (App.jsx or Router)

```javascript
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsService } from './services/analytics.service';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    const pageName = location.pathname.replace('/', '') || 'home';
    analyticsService.trackPageView(pageName, document.title);
  }, [location]);

  return (
    // ... your app ...
  );
}
```

### Example 6: Track Sign In (AuthContext)

```javascript
import { analyticsService } from "../services/analytics.service";

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    // Check if new user
    const isNewUser = result._tokenResponse?.isNewUser;

    if (isNewUser) {
      analyticsService.trackSignUp("google");
      analyticsService.setUser(result.user.uid);
    } else {
      analyticsService.trackSignIn("google");
      analyticsService.setUser(result.user.uid);
    }

    // Set user properties
    analyticsService.setUserProperty({
      user_type: "authenticated",
      sign_in_method: "google",
    });
  } catch (error) {
    analyticsService.trackError("sign_in_failed", error.message, "AuthContext");
  }
};
```

### Example 7: Track App Sharing (ExportPage)

```javascript
import { analyticsService } from "../services/analytics.service";

const handleShare = async () => {
  const shareUrl = "https://resumeforge.pages.dev/";

  if (navigator.share) {
    try {
      await navigator.share({
        title: "ResumeForge - Professional Resume Builder",
        text: "Check out ResumeForge! Create professional resumes easily.",
        url: shareUrl,
      });

      // Track successful share
      analyticsService.trackAppShared("native_share");
    } catch (error) {
      if (error.name !== "AbortError") {
        navigator.clipboard.writeText(shareUrl);
        analyticsService.trackAppShared("clipboard");
      }
    }
  } else {
    navigator.clipboard.writeText(shareUrl);
    analyticsService.trackAppShared("clipboard");
  }
};
```

### Example 8: Track Preview Opens (ResumeBuilder)

```javascript
import { analyticsService } from "../services/analytics.service";

const handlePreviewClick = () => {
  setShowPreviewModal(true);

  // Track analytics
  analyticsService.trackPreviewOpened("builder");
};
```

### Example 9: Track Feedback (ProfilePage)

```javascript
import { analyticsService } from "../services/analytics.service";

const handleSendFeedback = () => {
  const subject = encodeURIComponent("ResumeForge Feedback");
  const body = encodeURIComponent(`...`);
  window.location.href = `mailto:msbello@cc.cc?subject=${subject}&body=${body}`;

  // Track analytics
  analyticsService.trackFeedbackSent();
};
```

### Example 10: Track Conversion Funnel

```javascript
import { analyticsService } from "../services/analytics.service";

// Step 1: Homepage
useEffect(() => {
  analyticsService.trackFunnelStep("homepage_visit", 1);
}, []);

// Step 2: Resume Created
const handleCreateResume = () => {
  analyticsService.trackFunnelStep("resume_created", 2);
  // ... create resume logic ...
};

// Step 3: First Section Edited
const handleFirstEdit = () => {
  analyticsService.trackFunnelStep("first_section_edited", 3);
  // ... edit logic ...
};

// Step 4: Export Page Reached
useEffect(() => {
  analyticsService.trackFunnelStep("export_page_reached", 4);
  analyticsService.trackExportPageReached();
}, []);

// Step 5: PDF Downloaded
const handleDownload = () => {
  analyticsService.trackFunnelStep("pdf_downloaded", 5);
  analyticsService.trackResumeDownloaded(fileName);
};
```

## Quick Integration Checklist

### Priority 1 (Must Have)

- [ ] Track resume creation
- [ ] Track PDF downloads
- [ ] Track export page reached
- [ ] Track sign in/sign up
- [ ] Track page views

### Priority 2 (Should Have)

- [ ] Track template changes
- [ ] Track section editing
- [ ] Track preview opens
- [ ] Track app sharing
- [ ] Track errors

### Priority 3 (Nice to Have)

- [ ] Track section toggles
- [ ] Track feedback sent
- [ ] Track feature usage
- [ ] Track user properties
- [ ] Track conversion funnel

## Testing Your Integration

1. Open browser console
2. Perform an action (e.g., create resume)
3. Check Firebase Console → Analytics → DebugView
4. Verify event appears with correct parameters

## Common Mistakes to Avoid

1. ❌ Tracking PII (personal information)
2. ❌ Tracking too many events (creates noise)
3. ❌ Not adding event parameters (loses context)
4. ❌ Forgetting to check if analytics is available
5. ❌ Not testing in DebugView before deploying

## Performance Considerations

- Analytics calls are async and non-blocking
- Failed analytics don't affect app functionality
- Events are batched and sent periodically
- Minimal performance impact (<1ms per event)
