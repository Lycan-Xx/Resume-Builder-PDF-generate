# Firestore Setup Instructions

## Step 1: Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`resumeforge-a941c`)
3. Click on **Firestore Database** in the left sidebar
4. Click **Create database**
5. Choose **Start in production mode** (we'll add rules next)
6. Select a location (choose closest to your users)
7. Click **Enable**

## Step 2: Deploy Firestore Security Rules

### Option A: Using Firebase Console (Easiest)

1. In Firebase Console, go to **Firestore Database**
2. Click on the **Rules** tab
3. Copy the contents of `firestore.rules` file from this project
4. Paste into the rules editor
5. Click **Publish**

### Option B: Using Firebase CLI

1. Install Firebase CLI (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase in your project:
   ```bash
   firebase init firestore
   ```
   - Select your project
   - Accept default file names

4. Deploy the rules:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Step 3: Create Firestore Index

For optimal query performance, create a composite index:

1. In Firebase Console, go to **Firestore Database**
2. Click on the **Indexes** tab
3. Click **Create Index**
4. Configure:
   - **Collection ID:** `resumes`
   - **Fields to index:**
     - Field: `userId`, Order: Ascending
     - Field: `updatedAt`, Order: Descending
   - **Query scope:** Collection
5. Click **Create**

**Note:** The index may take a few minutes to build.

## Step 4: Verify Setup

### Test Firestore Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open browser console (F12)

3. Sign in to your app

4. Create a new resume

5. Check console for sync messages:
   - ✅ "🔄 Syncing local resumes with Firestore..."
   - ✅ "✅ Sync complete: X resumes"

### Check Firestore Console

1. Go to **Firestore Database** > **Data** tab
2. You should see a `resumes` collection
3. Click on a document to verify structure:
   ```
   {
     id: "...",
     userId: "...",
     name: "...",
     data: {...},
     createdAt: Timestamp,
     updatedAt: Timestamp,
     lastSyncedAt: Timestamp,
     syncStatus: "synced"
   }
   ```

## Step 5: Test Sync Features

### Test Offline Sync

1. Open DevTools (F12)
2. Go to **Network** tab
3. Check **Offline** checkbox
4. Edit a resume
5. Uncheck **Offline**
6. Verify sync completes

### Test Multi-Device Sync

1. Sign in on Device A
2. Create/edit a resume
3. Sign in on Device B (or different browser)
4. Verify resume appears
5. Edit on Device B
6. Refresh Device A
7. Verify changes appear

### Test Resume Limit

1. Create 3 resumes
2. Try to create a 4th
3. Should see error message
4. Delete one resume
5. Create new resume (should work)

## Troubleshooting

### Error: "Missing or insufficient permissions"

**Cause:** Firestore rules not deployed or incorrect

**Solution:**
1. Verify rules in Firebase Console
2. Make sure rules match `firestore.rules` file
3. Click **Publish** in rules editor

### Error: "The query requires an index"

**Cause:** Composite index not created

**Solution:**
1. Click the link in the error message (opens Firebase Console)
2. Click **Create Index**
3. Wait for index to build (few minutes)

### Resumes Not Syncing

**Check:**
1. User is logged in (check `user` in console)
2. Internet connection is active
3. Firebase config in `.env.local` is correct
4. Firestore is enabled in Firebase Console
5. Browser console for error messages

### Sync Status Stuck

**Solution:**
1. Open browser console
2. Run: `localStorage.removeItem('resumeSyncQueue')`
3. Refresh page
4. Try again

## Security Notes

### Current Rules

- ✅ Users can only access their own resumes
- ✅ userId is validated on create/update
- ✅ All other collections are denied
- ✅ Unauthenticated users have no access

### Best Practices

1. **Never expose Firebase credentials in client code**
   - Use environment variables (`.env.local`)
   - Keep `.env.local` in `.gitignore`

2. **Regularly review Firestore rules**
   - Check for security vulnerabilities
   - Test with different user scenarios

3. **Monitor Firestore usage**
   - Check Firebase Console for usage stats
   - Set up billing alerts
   - Optimize queries to reduce reads

4. **Backup your data**
   - Enable automatic backups in Firebase Console
   - Export data regularly for safety

## Cost Optimization

### Free Tier Limits (Spark Plan)

- **Stored data:** 1 GB
- **Document reads:** 50,000/day
- **Document writes:** 20,000/day
- **Document deletes:** 20,000/day

### Tips to Stay Within Free Tier

1. **Debounce saves** (already implemented - 1 second)
2. **Batch operations** when possible
3. **Cache data locally** (already implemented)
4. **Limit query results** (already implemented)
5. **Use offline persistence** (already implemented)

### Monitoring Usage

1. Go to Firebase Console
2. Click **Usage and billing**
3. View Firestore usage stats
4. Set up alerts for approaching limits

## Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test all sync features
3. ✅ Verify security rules work correctly
4. ✅ Monitor usage in Firebase Console
5. 📝 Consider implementing premium features
6. 📝 Set up automated backups
7. 📝 Add analytics for user behavior

## Support Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Security Rules Guide](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Pricing](https://firebase.google.com/pricing)
- [Firebase Support](https://firebase.google.com/support)

## Questions?

If you encounter issues:
1. Check browser console for errors
2. Review Firebase Console for Firestore errors
3. Verify all setup steps completed
4. Check `FIRESTORE_SYNC_GUIDE.md` for detailed info
