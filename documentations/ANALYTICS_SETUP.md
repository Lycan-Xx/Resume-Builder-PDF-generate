# Firebase Analytics Setup Guide

## Overview
This guide will help you set up Firebase Analytics to track user behavior and app usage in ResumeForge.

## Step 1: Enable Analytics in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **Analytics** in the left sidebar
4. If not already enabled, click **Enable Google Analytics**
5. Follow the prompts to link or create a Google Analytics account
6. Choose your analytics settings (recommended: enable all data sharing)

## Step 2: Add Measurement ID to Environment Variables

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Find your web app and look for the `measurementId`
4. Add it to your `.env` file:

```env
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Step 3: Update Firebase Config (Already Done)

The analytics initialization is already set up in `src/config/firebase.js`. It will automatically initialize when the app loads.

## Step 4: Install Analytics Package

The analytics package should already be installed. If not, run:

```bash
npm install firebase
```

## What Analytics Are Being Tracked?

### Automatic Events (No Code Required)
- **first_open**: When user opens app for the first time
- **session_start**: When user starts a session
- **user_engagement**: Time spent in app
- **page_view**: Page navigation

### Custom Events (Implemented)

#### Resume Creation Flow
- `resume_created`: When user creates a new resume
- `resume_selected`: When user selects a resume from stash
- `resume_deleted`: When user deletes a resume
- `resume_downloaded`: When PDF is downloaded

#### Section Editing
- `section_edited`: Which sections users edit
- `section_toggled`: When sections are enabled/disabled

#### Template Usage
- `template_changed`: Which templates are popular

#### Export & Download
- `export_page_reached`: Conversion funnel tracking
- `preview_opened`: Preview usage (builder vs export)

#### User Authentication
- `login`: User sign in
- `sign_up`: New user registration
- `sign_out`: User sign out

#### Engagement
- `share`: App sharing
- `feedback_sent`: User feedback
- `feature_used`: Feature usage tracking

#### Error Tracking
- `error_occurred`: Application errors

## Most Valuable Metrics for ResumeForge

### 1. **Conversion Funnel** (CRITICAL)
Track the user journey:
- Homepage visit → Resume created → Sections filled → Export reached → PDF downloaded

**Why it matters**: Identifies where users drop off

### 2. **Template Popularity** (HIGH VALUE)
- Which templates users choose most
- Template change frequency

**Why it matters**: Focus design efforts on popular templates

### 3. **Section Engagement** (HIGH VALUE)
- Which sections users fill out
- Which sections are skipped
- Time spent per section

**Why it matters**: Understand which sections need improvement

### 4. **User Retention** (CRITICAL)
- Daily/Weekly/Monthly active users
- Session duration
- Return rate

**Why it matters**: Measure app stickiness

### 5. **Feature Usage** (MEDIUM VALUE)
- Preview usage
- Template switching
- Section management

**Why it matters**: Prioritize feature development

### 6. **Download Success Rate** (CRITICAL)
- Export page reached vs actual downloads
- Download errors

**Why it matters**: Measure primary conversion goal

## Viewing Your Analytics

### Firebase Console
1. Go to Firebase Console → Analytics → Dashboard
2. View real-time data, user demographics, and events
3. Create custom reports and funnels

### Google Analytics 4
1. Link opens in Google Analytics
2. More advanced reporting and analysis
3. Custom dimensions and metrics

## Key Reports to Monitor

### 1. **Engagement Report**
- Active users over time
- Session duration
- Pages per session

### 2. **Events Report**
- Top events by count
- Event parameters
- Conversion events

### 3. **User Acquisition**
- Traffic sources
- Campaign performance
- Geographic distribution

### 4. **Retention Report**
- User retention cohorts
- Churn rate
- Lifetime value

### 5. **Funnel Analysis**
Create a funnel:
1. Homepage visit
2. Resume created
3. Section edited
4. Export page reached
5. Resume downloaded

## Privacy Considerations

### GDPR Compliance
- Analytics data is anonymized by default
- No PII (Personally Identifiable Information) is tracked
- Users can opt-out via browser settings

### What We Track
✅ Anonymous user behavior
✅ Feature usage
✅ Error events
✅ Performance metrics

### What We DON'T Track
❌ Resume content
❌ Personal information
❌ Email addresses (except for auth)
❌ Sensitive data

## Testing Analytics

### Development Mode
Analytics events are sent in development but marked as debug events.

### Test Events
Use the DebugView in Firebase Console:
1. Go to Analytics → DebugView
2. Events appear in real-time
3. Verify event parameters

### Chrome Extension
Install **Google Analytics Debugger** extension to see events in console.

## Troubleshooting

### Analytics Not Working?
1. Check if `measurementId` is in `.env`
2. Verify Firebase config is correct
3. Check browser console for errors
4. Ensure ad blockers are disabled for testing
5. Wait 24-48 hours for data to appear in reports

### Events Not Showing?
1. Check DebugView for real-time events
2. Verify `analyticsService.isAvailable()` returns true
3. Check browser console for analytics errors

## Best Practices

1. **Don't Over-Track**: Only track meaningful events
2. **Use Consistent Naming**: Follow the naming convention
3. **Add Context**: Include relevant parameters with events
4. **Monitor Regularly**: Check analytics weekly
5. **Act on Insights**: Use data to improve the app

## Next Steps

1. Enable Analytics in Firebase Console
2. Add measurement ID to `.env`
3. Deploy your app
4. Wait 24-48 hours for initial data
5. Create custom reports and funnels
6. Monitor key metrics weekly

## Support

For issues or questions:
- Firebase Documentation: https://firebase.google.com/docs/analytics
- Google Analytics 4: https://support.google.com/analytics
