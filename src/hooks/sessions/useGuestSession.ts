import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  StartSessionResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useGuestSession = (
  username = 'b2a6da08-88bf-4778-b993-7234e6d8a3ff'
): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ChatKittyError>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.startSession({
        username,
      });

      if (succeeded<StartSessionResult>(result)) {
        // succeeded
        console.log('started guest session.');
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
