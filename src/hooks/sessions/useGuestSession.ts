import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  StartSessionResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useGuestSession = (
  username = 'b2a6da08-88bf-4778-b993-7234e6d8a3ff'
): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const { isLoading, error, setIsLoading, setError } = useResourceState({
    defaultIsLoading: true,
  });

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.startSession({
        username,
      });

      if (succeeded<StartSessionResult>(result)) {
        // succeeded
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
  };
};

export default useGuestSession;
