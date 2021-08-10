/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_UNSPLASH_ACCESS_KEY: string;
  }
}

interface Window {
  Stripe: any
}
