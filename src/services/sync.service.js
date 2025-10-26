import { firestoreService } from "./firestore.service";

const SYNC_QUEUE_KEY = "resumeSyncQueue";
const SYNC_INTERVAL = 5000; // 5 seconds

/**
 * Sync service for handling offline operations
 */
class SyncService {
  constructor() {
    this.syncInterval = null;
    this.isSyncing = false;
    this.isOnline = navigator.onLine;
    this.listeners = new Set();

    // Listen for online/offline events
    window.addEventListener("online", () => this.handleOnline());
    window.addEventListener("offline", () => this.handleOffline());
  }

  /**
   * Add a listener for sync events
   */
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  /**
   * Notify all listeners
   */
  notifyListeners(event) {
    this.listeners.forEach((callback) => callback(event));
  }

  /**
   * Handle coming back online
   */
  handleOnline() {
    console.log("📡 Back online - starting sync...");
    this.isOnline = true;
    this.notifyListeners({ type: "online" });
    this.startAutoSync();
    this.processSyncQueue();
  }

  /**
   * Handle going offline
   */
  handleOffline() {
    console.log("📴 Offline - queuing changes...");
    this.isOnline = false;
    this.notifyListeners({ type: "offline" });
    this.stopAutoSync();
  }

  /**
   * Get sync queue from localStorage
   */
  getSyncQueue() {
    try {
      const queue = localStorage.getItem(SYNC_QUEUE_KEY);
      return queue ? JSON.parse(queue) : [];
    } catch (error) {
      console.error("Error reading sync queue:", error);
      return [];
    }
  }

  /**
   * Save sync queue to localStorage
   */
  saveSyncQueue(queue) {
    try {
      localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
    } catch (error) {
      console.error("Error saving sync queue:", error);
    }
  }

  /**
   * Add operation to sync queue
   */
  queueOperation(operation) {
    const queue = this.getSyncQueue();
    queue.push({
      ...operation,
      timestamp: new Date().toISOString(),
      id: Date.now().toString() + Math.random(),
    });
    this.saveSyncQueue(queue);
    this.notifyListeners({ type: "queued", operation });

    // Try to sync immediately if online
    if (this.isOnline) {
      this.processSyncQueue();
    }
  }

  /**
   * Process all queued operations
   */
  async processSyncQueue() {
    if (this.isSyncing || !this.isOnline) return;

    this.isSyncing = true;
    const queue = this.getSyncQueue();

    if (queue.length === 0) {
      this.isSyncing = false;
      return;
    }

    console.log(`🔄 Processing ${queue.length} queued operations...`);
    this.notifyListeners({ type: "sync_start", count: queue.length });

    const remainingQueue = [];

    for (const operation of queue) {
      try {
        await this.executeOperation(operation);
        console.log("✅ Synced:", operation.type, operation.resumeId);
      } catch (error) {
        console.error("❌ Sync failed:", operation.type, error);
        // Keep failed operations in queue
        remainingQueue.push(operation);
      }
    }

    this.saveSyncQueue(remainingQueue);
    this.isSyncing = false;

    const syncedCount = queue.length - remainingQueue.length;
    this.notifyListeners({
      type: "sync_complete",
      synced: syncedCount,
      failed: remainingQueue.length,
    });

    console.log(`✅ Synced ${syncedCount} operations, ${remainingQueue.length} remaining`);
  }

  /**
   * Execute a single sync operation
   */
  async executeOperation(operation) {
    const { type, userId, resume, resumeId } = operation;

    switch (type) {
      case "save":
        return await firestoreService.saveResume(userId, resume);
      case "delete":
        return await firestoreService.deleteResume(resumeId);
      default:
        throw new Error(`Unknown operation type: ${type}`);
    }
  }

  /**
   * Queue a resume save operation
   */
  queueSave(userId, resume) {
    this.queueOperation({
      type: "save",
      userId,
      resume,
      resumeId: resume.id,
    });
  }

  /**
   * Queue a resume delete operation
   */
  queueDelete(userId, resumeId) {
    this.queueOperation({
      type: "delete",
      userId,
      resumeId,
    });
  }

  /**
   * Start auto-sync interval
   */
  startAutoSync() {
    if (this.syncInterval) return;

    this.syncInterval = setInterval(() => {
      this.processSyncQueue();
    }, SYNC_INTERVAL);
  }

  /**
   * Stop auto-sync interval
   */
  stopAutoSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  /**
   * Clear sync queue
   */
  clearQueue() {
    this.saveSyncQueue([]);
    this.notifyListeners({ type: "queue_cleared" });
  }

  /**
   * Get pending operations count
   */
  getPendingCount() {
    return this.getSyncQueue().length;
  }

  /**
   * Check if online
   */
  checkOnlineStatus() {
    return this.isOnline;
  }
}

export const syncService = new SyncService();
