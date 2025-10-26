import { logEvent, setUserId, setUserProperties } from 'firebase/analytics';
import { analytics } from '../config/firebase';

/**
 * Firebase Analytics Service
 * Tracks user behavior and app usage
 */

class AnalyticsService {
  /**
   * Check if analytics is available
   */
  isAvailable() {
    return analytics !== null;
  }

  /**
   * Set user ID for tracking
   */
  setUser(userId) {
    if (!this.isAvailable()) return;
    try {
      setUserId(analytics, userId);
    } catch (error) {
      console.error('Analytics setUser error:', error);
    }
  }

  /**
   * Set user properties
   */
  setUserProperty(properties) {
    if (!this.isAvailable()) return;
    try {
      setUserProperties(analytics, properties);
    } catch (error) {
      console.error('Analytics setUserProperty error:', error);
    }
  }

  // ============================================
  // PAGE VIEW TRACKING
  // ============================================

  /**
   * Track page views
   */
  trackPageView(pageName, pageTitle) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'page_view', {
        page_name: pageName,
        page_title: pageTitle,
        page_location: window.location.href,
      });
    } catch (error) {
      console.error('Analytics trackPageView error:', error);
    }
  }

  // ============================================
  // RESUME CREATION TRACKING
  // ============================================

  /**
   * Track when user creates a new resume
   */
  trackResumeCreated(resumeName) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'resume_created', {
        resume_name: resumeName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics trackResumeCreated error:', error);
    }
  }

  /**
   * Track when user selects a resume from stash
   */
  trackResumeSelected(resumeId) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'resume_selected', {
        resume_id: resumeId,
      });
    } catch (error) {
      console.error('Analytics trackResumeSelected error:', error);
    }
  }

  /**
   * Track when user deletes a resume
   */
  trackResumeDeleted(resumeId) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'resume_deleted', {
        resume_id: resumeId,
      });
    } catch (error) {
      console.error('Analytics trackResumeDeleted error:', error);
    }
  }

  // ============================================
  // SECTION EDITING TRACKING
  // ============================================

  /**
   * Track when user edits a section
   */
  trackSectionEdited(sectionName) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'section_edited', {
        section_name: sectionName,
      });
    } catch (error) {
      console.error('Analytics trackSectionEdited error:', error);
    }
  }

  /**
   * Track when user adds/removes sections
   */
  trackSectionToggled(sectionName, isEnabled) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'section_toggled', {
        section_name: sectionName,
        is_enabled: isEnabled,
      });
    } catch (error) {
      console.error('Analytics trackSectionToggled error:', error);
    }
  }

  // ============================================
  // TEMPLATE TRACKING
  // ============================================

  /**
   * Track template selection
   */
  trackTemplateChanged(templateId, templateName) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'template_changed', {
        template_id: templateId,
        template_name: templateName,
      });
    } catch (error) {
      console.error('Analytics trackTemplateChanged error:', error);
    }
  }

  // ============================================
  // EXPORT & DOWNLOAD TRACKING
  // ============================================

  /**
   * Track when user reaches export page
   */
  trackExportPageReached() {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'export_page_reached', {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics trackExportPageReached error:', error);
    }
  }

  /**
   * Track PDF preview
   */
  trackPreviewOpened(location) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'preview_opened', {
        location: location, // 'builder' or 'export'
      });
    } catch (error) {
      console.error('Analytics trackPreviewOpened error:', error);
    }
  }

  /**
   * Track PDF download
   */
  trackResumeDownloaded(fileName) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'resume_downloaded', {
        file_name: fileName,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics trackResumeDownloaded error:', error);
    }
  }

  // ============================================
  // USER AUTHENTICATION TRACKING
  // ============================================

  /**
   * Track sign in
   */
  trackSignIn(method = 'google') {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'login', {
        method: method,
      });
    } catch (error) {
      console.error('Analytics trackSignIn error:', error);
    }
  }

  /**
   * Track sign up (first time user)
   */
  trackSignUp(method = 'google') {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'sign_up', {
        method: method,
      });
    } catch (error) {
      console.error('Analytics trackSignUp error:', error);
    }
  }

  /**
   * Track sign out
   */
  trackSignOut() {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'sign_out', {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics trackSignOut error:', error);
    }
  }

  // ============================================
  // SHARING & ENGAGEMENT TRACKING
  // ============================================

  /**
   * Track app sharing
   */
  trackAppShared(method) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'share', {
        content_type: 'app',
        method: method, // 'native_share' or 'clipboard'
      });
    } catch (error) {
      console.error('Analytics trackAppShared error:', error);
    }
  }

  /**
   * Track feedback sent
   */
  trackFeedbackSent() {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'feedback_sent', {
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Analytics trackFeedbackSent error:', error);
    }
  }

  // ============================================
  // ERROR TRACKING
  // ============================================

  /**
   * Track errors
   */
  trackError(errorName, errorMessage, errorLocation) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'error_occurred', {
        error_name: errorName,
        error_message: errorMessage,
        error_location: errorLocation,
      });
    } catch (error) {
      console.error('Analytics trackError error:', error);
    }
  }

  // ============================================
  // CONVERSION TRACKING
  // ============================================

  /**
   * Track conversion funnel steps
   */
  trackFunnelStep(stepName, stepNumber) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'funnel_step', {
        step_name: stepName,
        step_number: stepNumber,
      });
    } catch (error) {
      console.error('Analytics trackFunnelStep error:', error);
    }
  }

  /**
   * Track feature usage
   */
  trackFeatureUsed(featureName) {
    if (!this.isAvailable()) return;
    try {
      logEvent(analytics, 'feature_used', {
        feature_name: featureName,
      });
    } catch (error) {
      console.error('Analytics trackFeatureUsed error:', error);
    }
  }
}

export const analyticsService = new AnalyticsService();
