import kitty from 'clients/kitty';
import { useState } from 'react';

const useEndSession = (): {
  isLoading: boolean;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async () => {
    setIsLoading(true);

    await kitty.endSession();

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useEndSession;
