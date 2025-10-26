# Firestore Sync Implementation Guide

## Overview

This guide explains the Firestore synchronization system for ResumeForge, which enables seamless multi-device resume management with offline support.

## Features Implemented

### ✅ Core Features

1. **Offline-First Architecture**
   - Build resumes without internet connection
   - Changes are queued and synced when back online
   - Auto-sync every 5 seconds when online

2. **Pre-Login Resume Preservation**
   - Create resumes before signing in
   - Automatically upload to Firestore when user logs in
   - Merge with existing cloud resumes using last-write-wins

3. **Real-Time Sync for Logged-In Users**
   - Auto-save to Firestore (debounced 1 second)
   - Sync status indicators in UI
   - Background sync queue for failed operations

4. **Multi-Resume Management**
   - Create, update, and delete multiple resumes
   - 3 free resumes per user limit
   - Cross-device synchronization

5. **Conflict Resolution**
   - Last-write-wins strategy (simpler and more predictable)
   - Compares timestamps to determine which version to keep

6. **Sync Status Indicators**
   - Online/Offline status
   - Syncing progress
   - Last synced timestamp on each resume
   - Pending changes count

## Architecture

### File Structure

```
src/
├── services/
│   ├── firestore.service.js    # Firestore CRUD operations
│   └── sync.service.js          # Offline queue & sync logic
├── hooks/
│   └── useResumeSync.js         # React hook for sync status
├── contexts/
│   └── ResumeContext.jsx        # Updated with Firestore sync
└── pages/
    ├── HomePage.jsx             # Sync on login/logout
    └── new_resume/
        └── StashPanel.jsx       # Sync status UI
```

### Data Flow

```
User Action
    ↓
ResumeContext (updates state)
    ↓
localStorage (immediate save)
    ↓
Sync Service (queue operation)
    ↓
Firestore (when online)
```

## Firestore Data Structure

### Collection: `resumes`

```javascript
{
  id: string,                    // Local resume ID
  userId: string,                // Firebase user UID
  name: string,                  // Resume name
  data: {                        // Full resume data
    basics: {...},
    experience: [...],
    education: [...],
    // ... all resume sections
  },
  createdAt: Timestamp,          // Creation time
  updatedAt: Timestamp,          // Last update time
  lastSyncedAt: Timestamp,       // Last sync time
  syncStatus: string             // 'synced' | 'pending' | 'error'
}
```

## Key Components

### 1. Firestore Service (`firestore.service.js`)

Handles all Firestore operations:

- `getUserResumes(userId)` - Get all resumes for a user
- `getResume(resumeId)` - Get a single resume
- `saveResume(userId, resume)` - Create or update a resume
- `deleteResume(resumeId)` - Delete a resume
- `syncLocalResumes(userId, localResumes)` - Sync local resumes on login
- `canCreateResume(userId)` - Check if user can create more resumes
- `getResumeCount(userId)` - Get user's resume count

**Resume Limit:** 3 free resumes per user (configurable via `MAX_FREE_RESUMES`)

### 2. Sync Service (`sync.service.js`)

Manages offline operations and sync queue:

- Listens for online/offline events
- Queues operations when offline
- Auto-syncs when back online
- Retries failed operations
- Notifies listeners of sync events

**Sync Events:**
- `online` - Device came back online
- `offline` - Device went offline
- `sync_start` - Sync process started
- `sync_complete` - Sync process completed
- `queued` - Operation added to queue
- `queue_cleared` - Queue was cleared

### 3. Resume Sync Hook (`useResumeSync.js`)

React hook for accessing sync status:

```javascript
const { isOnline, isSyncing, pendingCount, lastSyncEvent } = useResumeSync();
```

### 4. Updated Resume Context

Now includes Firestore sync:
- Auto-saves to localStorage (1 second debounce)
- Queues sync to Firestore if user is logged in
- Updates resume list with latest data

## User Flows

### Flow 1: New User Creates Resume (Not Logged In)

1. User creates resume → Saved to localStorage
2. User continues editing → Auto-saved locally
3. User signs in → All local resumes uploaded to Firestore
4. Future edits → Auto-synced to Firestore

### Flow 2: Existing User Creates Resume (Logged In)

1. Check resume limit (3 free resumes)
2. If under limit → Create resume
3. Save to localStorage
4. Queue sync to Firestore
5. Sync immediately if online, or queue if offline

### Flow 3: User Edits Resume While Offline

1. User edits resume → Saved to localStorage
2. Sync operation queued
3. UI shows "Offline" status
4. When back online → Auto-sync queued operations
5. UI shows "Synced" status

### Flow 4: User Logs In on New Device

1. User signs in
2. Download all cloud resumes
3. Merge with any local resumes (if any)
4. Use last-write-wins for conflicts
5. Update local storage with merged resumes

### Flow 5: User Deletes Resume

1. Delete from local storage
2. Update UI immediately
3. Queue delete operation for Firestore
4. Sync when online

## Sync Status Indicators

### In Stash Panel Header

- 🟢 **Synced** - All changes saved to cloud
- 🔵 **Syncing...** - Currently uploading changes
- 🟡 **Offline** - No internet connection
- 🟠 **X pending** - X operations waiting to sync

### On Each Resume Card

- **Updated:** Last local update time
- **Synced:** Last successful sync to Firestore
- **Not synced (limit reached):** Resume not synced due to limit

## Configuration

### Resume Limit

Change in `src/services/firestore.service.js`:

```javascript
const MAX_FREE_RESUMES = 3; // Change this value
```

### Sync Interval

Change in `src/services/sync.service.js`:

```javascript
const SYNC_INTERVAL = 5000; // 5 seconds (in milliseconds)
```

### Auto-Save Debounce

Change in `src/contexts/ResumeContext.jsx`:

```javascript
debounce((state) => {
  // ...
}, 1000) // 1 second (in milliseconds)
```

## Error Handling

### Resume Limit Reached

When user tries to create more than 3 resumes:
- Show alert with clear message
- Suggest deleting old resumes
- Don't allow creation until under limit

### Sync Failures

- Operations remain in queue
- Retry on next sync cycle
- User can continue working offline
- Changes preserved in localStorage

### Network Errors

- Gracefully handle offline state
- Queue all operations
- Auto-resume when back online
- No data loss

## Testing Checklist

### Offline Functionality
- [ ] Create resume while offline
- [ ] Edit resume while offline
- [ ] Delete resume while offline
- [ ] Go offline mid-edit
- [ ] Come back online and verify sync

### Multi-Device
- [ ] Create resume on Device A
- [ ] Sign in on Device B and verify it appears
- [ ] Edit on Device B
- [ ] Refresh Device A and verify changes

### Resume Limit
- [ ] Create 3 resumes
- [ ] Try to create 4th resume (should fail)
- [ ] Delete one resume
- [ ] Create new resume (should succeed)

### Conflict Resolution
- [ ] Edit same resume on two devices while offline
- [ ] Go online on both
- [ ] Verify last-write-wins

## Future Enhancements

### Potential Features (Not Implemented)

1. **Version History**
   - Keep previous versions of resumes
   - Restore from history
   - See what changed

2. **Resume Sharing**
   - Share resume link with others
   - Public profile URL
   - Read-only access

3. **Premium Features**
   - Unlimited resumes
   - Advanced templates
   - Priority sync

4. **Collaborative Editing**
   - Real-time collaboration
   - Comments and suggestions
   - Share with mentors/reviewers

## Troubleshooting

### Resumes Not Syncing

1. Check if user is logged in
2. Check internet connection
3. Check browser console for errors
4. Verify Firebase configuration in `.env.local`
5. Check Firestore rules in Firebase Console

### Sync Status Stuck on "Syncing..."

1. Check network tab for failed requests
2. Clear sync queue: `syncService.clearQueue()`
3. Refresh page
4. Check Firestore rules

### Resume Limit Not Working

1. Verify `MAX_FREE_RESUMES` constant
2. Check Firestore query results
3. Verify user authentication
4. Check browser console for errors

## Firebase Console Setup

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /resumes/{resumeId} {
      // Users can only read/write their own resumes
      allow read, write: if request.auth != null && 
                           request.resource.data.userId == request.auth.uid;
      
      // Allow user to read their own resumes
      allow read: if request.auth != null && 
                     resource.data.userId == request.auth.uid;
    }
  }
}
```

### Indexes

Create composite index for:
- Collection: `resumes`
- Fields: `userId` (Ascending), `updatedAt` (Descending)

## Support

For issues or questions:
1. Check browser console for errors
2. Review this guide
3. Check Firebase Console for Firestore errors
4. Verify environment variables in `.env.local`
