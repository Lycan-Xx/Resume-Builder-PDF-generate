import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

const RESUMES_COLLECTION = "resumes";
const MAX_FREE_RESUMES = 3;

/**
 * Firestore service for resume operations
 */
class FirestoreService {
  /**
   * Get all resumes for a user
   */
  async getUserResumes(userId) {
    if (!db || !userId) return [];

    try {
      const resumesRef = collection(db, RESUMES_COLLECTION);
      const q = query(
        resumesRef,
        where("userId", "==", userId),
        orderBy("updatedAt", "desc")
      );

      const snapshot = await getDocs(q);
      return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || doc.data().updatedAt,
        lastSyncedAt: doc.data().lastSyncedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      }));
    } catch (error) {
      console.error("Error fetching user resumes:", error);
      throw error;
    }
  }

  /**
   * Get a single resume by ID
   */
  async getResume(resumeId) {
    if (!db || !resumeId) return null;

    try {
      const resumeRef = doc(db, RESUMES_COLLECTION, resumeId);
      const snapshot = await getDoc(resumeRef);

      if (!snapshot.exists()) return null;

      const data = snapshot.data();
      return {
        ...data,
        id: snapshot.id,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
        lastSyncedAt: data.lastSyncedAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      };
    } catch (error) {
      console.error("Error fetching resume:", error);
      throw error;
    }
  }

  /**
   * Create or update a resume
   */
  async saveResume(userId, resume) {
    if (!db || !userId || !resume) {
      throw new Error("Missing required parameters");
    }

    try {
      // Check resume limit for new resumes
      if (!resume.firestoreId) {
        const userResumes = await this.getUserResumes(userId);
        if (userResumes.length >= MAX_FREE_RESUMES) {
          throw new Error(`You've reached the maximum of ${MAX_FREE_RESUMES} free resumes. Please delete one to create a new resume.`);
        }
      }

      const resumeId = resume.firestoreId || resume.id;
      const resumeRef = doc(db, RESUMES_COLLECTION, resumeId);

      const resumeData = {
        userId,
        id: resume.id,
        name: resume.name,
        data: resume.data,
        createdAt: resume.createdAt ? Timestamp.fromDate(new Date(resume.createdAt)) : serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastSyncedAt: serverTimestamp(),
        syncStatus: "synced",
      };

      await setDoc(resumeRef, resumeData, { merge: true });

      return {
        ...resume,
        firestoreId: resumeId,
        lastSyncedAt: new Date().toISOString(),
        syncStatus: "synced",
      };
    } catch (error) {
      console.error("Error saving resume:", error);
      throw error;
    }
  }

  /**
   * Delete a resume
   */
  async deleteResume(resumeId) {
    if (!db || !resumeId) {
      throw new Error("Missing resume ID");
    }

    try {
      const resumeRef = doc(db, RESUMES_COLLECTION, resumeId);
      await deleteDoc(resumeRef);
      return true;
    } catch (error) {
      console.error("Error deleting resume:", error);
      throw error;
    }
  }

  /**
   * Sync local resumes to Firestore (on login)
   */
  async syncLocalResumes(userId, localResumes) {
    if (!db || !userId || !localResumes || localResumes.length === 0) {
      return [];
    }

    try {
      // Get existing cloud resumes
      const cloudResumes = await this.getUserResumes(userId);
      const cloudResumeMap = new Map(cloudResumes.map((r) => [r.id, r]));

      const syncedResumes = [];

      for (const localResume of localResumes) {
        const cloudResume = cloudResumeMap.get(localResume.id);

        // Last-write-wins: Compare timestamps
        if (cloudResume) {
          const localTime = new Date(localResume.updatedAt).getTime();
          const cloudTime = new Date(cloudResume.updatedAt).getTime();

          if (localTime > cloudTime) {
            // Local is newer, upload it
            const synced = await this.saveResume(userId, {
              ...localResume,
              firestoreId: cloudResume.id,
            });
            syncedResumes.push(synced);
          } else {
            // Cloud is newer, keep it
            syncedResumes.push(cloudResume);
          }
        } else {
          // New local resume, upload it
          try {
            const synced = await this.saveResume(userId, localResume);
            syncedResumes.push(synced);
          } catch (error) {
            if (error.message.includes("maximum")) {
              console.warn("Resume limit reached, skipping:", localResume.name);
              // Keep local resume but mark as not synced
              syncedResumes.push({
                ...localResume,
                syncStatus: "limit_reached",
              });
            } else {
              throw error;
            }
          }
        }
      }

      // Add any cloud resumes that weren't in local
      for (const cloudResume of cloudResumes) {
        if (!localResumes.find((r) => r.id === cloudResume.id)) {
          syncedResumes.push(cloudResume);
        }
      }

      return syncedResumes;
    } catch (error) {
      console.error("Error syncing local resumes:", error);
      throw error;
    }
  }

  /**
   * Check if user has reached resume limit
   */
  async canCreateResume(userId) {
    if (!db || !userId) return true;

    try {
      const userResumes = await this.getUserResumes(userId);
      return userResumes.length < MAX_FREE_RESUMES;
    } catch (error) {
      console.error("Error checking resume limit:", error);
      return true; // Allow creation on error
    }
  }

  /**
   * Get resume count for user
   */
  async getResumeCount(userId) {
    if (!db || !userId) return 0;

    try {
      const userResumes = await this.getUserResumes(userId);
      return userResumes.length;
    } catch (error) {
      console.error("Error getting resume count:", error);
      return 0;
    }
  }
}

export const firestoreService = new FirestoreService();
export { MAX_FREE_RESUMES };
