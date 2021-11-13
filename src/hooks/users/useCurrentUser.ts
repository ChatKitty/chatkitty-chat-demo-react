import {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  GetCurrentUserSuccessfulResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useCurrentUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  setResource: Dispatch<SetStateAction<CurrentUser | undefined>>;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<CurrentUser>();

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

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    setResource,
    makeRequest,
  };
};

export default useCurrentUser;
