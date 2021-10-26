import {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  succeeded,
  UpdateCurrentUserResult,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUpdateCurrentUser = ({
  update,
}: {
  update: (user: CurrentUser) => CurrentUser;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.updateCurrentUser(update);

      if (succeeded<UpdateCurrentUserResult>(result)) {
        // empty response
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

export default useUpdateCurrentUser;
