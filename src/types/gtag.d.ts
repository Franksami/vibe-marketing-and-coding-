interface GtagConfig {
  page_path?: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: GtagConfig
    ) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export {};