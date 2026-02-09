export {};

declare global {
  interface Window {
    botpress?: {
      open: () => void;
      close: () => void;
      toggle: () => void;
      on: (event: string, cb: () => void) => void;
    };
  }
}
