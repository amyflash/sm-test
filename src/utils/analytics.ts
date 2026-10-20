/**
 * Google Analytics (GA4) Integration Utility
 * Supports automatic initialization from VITE_GA_MEASUREMENT_ID
 * and custom event tracking.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Fallback or environment Measurement ID
export const GA_MEASUREMENT_ID = 
  import.meta.env.VITE_GA_MEASUREMENT_ID || 
  (typeof window !== 'undefined' && (window as unknown as { __GA_MEASUREMENT_ID__?: string }).__GA_MEASUREMENT_ID__) ||
  '';

let isInitialized = false;

/**
 * Initialize Google Analytics (gtag.js)
 */
export const initGA = (customId?: string) => {
  const measurementId = customId || GA_MEASUREMENT_ID;

  if (typeof window === 'undefined') return;
  if (isInitialized) return;

  // Initialize dataLayer and gtag stub regardless, so events don't throw
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    // Measurement ID not yet provided; calls to gtag are safely buffered in window.dataLayer
    return;
  }

  // Inject Google Tag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true,
  });

  isInitialized = true;
};

/**
 * Track custom events
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track page view / screen transition
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
};

// Specialized Quiz Events
export const trackQuizStart = () => {
  trackEvent('quiz_start', {
    quiz_name: 'sm_personality_quiz',
  });
};

export const trackQuizAnswer = (questionId: string, answer: 'YES' | 'NO', stepNumber: number) => {
  trackEvent('quiz_answer', {
    question_id: questionId,
    answer,
    step: stepNumber,
  });
};

export const trackQuizComplete = (resultId: number, resultTitle: string, sPercentage: number, mPercentage: number) => {
  trackEvent('quiz_complete', {
    result_id: resultId,
    result_title: resultTitle,
    s_percentage: sPercentage,
    m_percentage: mPercentage,
  });
};

export const trackPosterDownload = (resultId: number, resultTitle: string) => {
  trackEvent('poster_download', {
    result_id: resultId,
    result_title: resultTitle,
  });
};

export const trackCopyShareText = (resultId: number) => {
  trackEvent('copy_share_text', {
    result_id: resultId,
  });
};

export const trackTabSwitch = (tab: string) => {
  trackEvent('tab_switch', {
    tab_name: tab,
  });
};
