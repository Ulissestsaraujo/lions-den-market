declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_ENVIRONMENT: 'development' | 'production' | 'test';
    // Add more environment variables here as needed
  }
}