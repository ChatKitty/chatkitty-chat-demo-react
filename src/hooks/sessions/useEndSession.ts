import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useEndSession = (): {
  isLoading: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      await kitty.endSession();

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
  };
};

export default useEndSession;
