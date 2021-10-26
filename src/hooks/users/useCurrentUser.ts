import {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  GetCurrentUserSuccessfulResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useCurrentUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<CurrentUser>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getCurrentUser();

      if (succeeded<GetCurrentUserSuccessfulResult>(result)) {
        setResource(result.user);
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
    resource,
  };
};

export default useCurrentUser;
