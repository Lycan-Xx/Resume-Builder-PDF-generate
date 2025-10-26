# Firebase Analytics - Quick Start

## 🚀 5-Minute Setup

### Step 1: Enable in Firebase Console (2 min)
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Analytics → Enable
3. Copy your Measurement ID (looks like `G-XXXXXXXXXX`)

### Step 2: Add to Environment (1 min)
Add to your `.env` file:
```env
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 3: Restart Dev Server (1 min)
```bash
npm run dev
```

### Step 4: Verify It Works (1 min)
1. Open your app
2. Go to Firebase Console → Analytics → DebugView
3. You should see events appearing in real-time

## 📊 Most Valuable Metrics for You

### 1. **Conversion Rate** ⭐⭐⭐⭐⭐
**What**: % of visitors who download a PDF
**Why**: Your primary success metric
**Where**: Analytics → Events → `resume_downloaded`

### 2. **User Retention** ⭐⭐⭐⭐⭐
**What**: How many users come back
**Why**: Indicates app value
**Where**: Analytics → Retention

### 3. **Drop-off Points** ⭐⭐⭐⭐⭐
**What**: Where users abandon the flow
**Why**: Shows what needs fixing
**Where**: Analytics → Funnels (create custom funnel)

### 4. **Template Popularity** ⭐⭐⭐⭐
**What**: Which templates users prefer
**Why**: Focus design efforts
**Where**: Analytics → Events → `template_changed`

### 5. **Section Engagement** ⭐⭐⭐⭐
**What**: Which sections users fill
**Why**: Understand user needs
**Where**: Analytics → Events → `section_edited`

### 6. **Traffic Sources** ⭐⭐⭐
**What**: Where users come from
**Why**: Optimize marketing
**Where**: Analytics → Acquisition

### 7. **Device Breakdown** ⭐⭐⭐
**What**: Mobile vs Desktop usage
**Why**: Prioritize responsive design
**Where**: Analytics → Tech → Devices

### 8. **Geographic Data** ⭐⭐
**What**: Where your users are located
**Why**: Localization opportunities
**Where**: Analytics → Demographics

## 🎯 Key Events to Track

### Must Track (Do First)
```javascript
import { analyticsService } from './services/analytics.service';

// When user creates resume
analyticsService.trackResumeCreated(resumeName);

// When user downloads PDF
analyticsService.trackResumeDownloaded(fileName);

// When user reaches export page
analyticsService.trackExportPageReached();

// When user signs in
analyticsService.trackSignIn('google');
```

### Should Track (Do Next)
```javascript
// Template changes
analyticsService.trackTemplateChanged(templateId, templateName);

// Section editing
analyticsService.trackSectionEdited(sectionName);

// Preview usage
analyticsService.trackPreviewOpened('builder');

// App sharing
analyticsService.trackAppShared('native_share');
```

## 📈 Creating Your First Funnel

1. Go to Firebase Console → Analytics → Analysis → Funnel Analysis
2. Create funnel with these steps:
   - Step 1: `page_view` (page_name = home)
   - Step 2: `resume_created`
   - Step 3: `section_edited`
   - Step 4: `export_page_reached`
   - Step 5: `resume_downloaded`
3. Save and monitor weekly

## 🔍 What to Monitor Weekly

### Week 1-4 (Launch Phase)
- [ ] Total users
- [ ] Conversion rate (downloads/visitors)
- [ ] Most popular templates
- [ ] Average session duration

### Month 2+ (Growth Phase)
- [ ] User retention (7-day, 30-day)
- [ ] Funnel drop-off points
- [ ] Feature usage trends
- [ ] Geographic expansion

### Month 6+ (Optimization Phase)
- [ ] Cohort analysis
- [ ] Lifetime value
- [ ] A/B test results
- [ ] Seasonal trends

## 💡 Quick Wins from Analytics

### If Conversion Rate is Low (<30%)
- Check where users drop off in funnel
- Simplify the resume creation flow
- Improve export page UX

### If Retention is Low (<20% weekly)
- Add more templates
- Improve resume editing experience
- Add email reminders

### If One Template Dominates (>60%)
- Promote other templates
- Improve template previews
- Add template recommendations

### If Mobile Usage is High (>50%)
- Prioritize mobile UX
- Test on various devices
- Optimize for touch

## 🚨 Common Issues

### "No data showing"
- Wait 24-48 hours after setup
- Check if Measurement ID is correct
- Verify analytics is enabled in Firebase Console

### "Events not appearing"
- Check browser console for errors
- Disable ad blockers
- Use DebugView for real-time testing

### "Data looks wrong"
- Filter out your own traffic (use IP exclusion)
- Check for bot traffic
- Verify event parameters are correct

## 📚 Next Steps

1. ✅ Complete 5-minute setup above
2. ✅ Add tracking to key events
3. ✅ Create conversion funnel
4. ✅ Monitor weekly metrics
5. ✅ Act on insights

## 🎓 Learn More

- Full Setup Guide: `ANALYTICS_SETUP.md`
- Integration Examples: `ANALYTICS_INTEGRATION_EXAMPLES.md`
- Firebase Docs: https://firebase.google.com/docs/analytics
