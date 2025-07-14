import Script from 'next/script';

export function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Helper functions for tracking events
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Log page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Log specific events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined events for your app
export const trackEvents = {
  emailCapture: (location: string) => {
    event({
      action: 'email_capture',
      category: 'engagement',
      label: location,
    });
  },
  
  signUp: (method: string) => {
    event({
      action: 'sign_up',
      category: 'authentication',
      label: method,
    });
  },
  
  login: (method: string) => {
    event({
      action: 'login',
      category: 'authentication',
      label: method,
    });
  },
  
  beginCheckout: (price: number) => {
    event({
      action: 'begin_checkout',
      category: 'ecommerce',
      value: price,
    });
  },
  
  purchase: (value: number) => {
    event({
      action: 'purchase',
      category: 'ecommerce',
      value: value,
    });
  },
  
  exitIntent: (variant: string) => {
    event({
      action: 'exit_intent_shown',
      category: 'engagement',
      label: variant,
    });
  },
  
  clickCTA: (buttonText: string, location: string) => {
    event({
      action: 'click_cta',
      category: 'engagement',
      label: `${buttonText} - ${location}`,
    });
  },
};