import { useState, useEffect } from "react";
import { syncService } from "../services/sync.service";

/**
 * Hook for tracking sync status
 */
export const useResumeSync = () => {
  const [isOnline, setIsOnline] = useState(syncService.checkOnlineStatus());
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(syncService.getPendingCount());
  const [lastSyncEvent, setLastSyncEvent] = useState(null);

  useEffect(() => {
    const unsubscribe = syncService.addListener((event) => {
      setLastSyncEvent(event);

      switch (event.type) {
        case "online":
          setIsOnline(true);
          break;
        case "offline":
          setIsOnline(false);
          break;
        case "sync_start":
          setIsSyncing(true);
          break;
        case "sync_complete":
          setIsSyncing(false);
          setPendingCount(syncService.getPendingCount());
          break;
        case "queued":
          setPendingCount(syncService.getPendingCount());
          break;
        case "queue_cleared":
          setPendingCount(0);
          break;
      }
    });

    return unsubscribe;
  }, []);

  return {
    isOnline,
    isSyncing,
    pendingCount,
    lastSyncEvent,
  };
};
