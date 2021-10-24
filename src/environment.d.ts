declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CHATKITTY_API_KEY: string;
    }
  }
}

export {};
