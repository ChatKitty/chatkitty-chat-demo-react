declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_CHATKITTY_API_KEY: string;
    }
  }
}

export {};
