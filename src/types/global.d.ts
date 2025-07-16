interface Window {
  gtag?: (
    command: string,
    action: string,
    parameters?: {
      [key: string]: any;
    }
  ) => void;
  GumroadOverlay?: {
    show: (options: { url: string }) => void;
  };
}