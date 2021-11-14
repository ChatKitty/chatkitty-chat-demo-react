import {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  GetCurrentUserSuccessfulResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { Dispatch, SetStateAction, useEffect } from 'react';

const useCurrentUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  setResource: Dispatch<SetStateAction<CurrentUser | undefined>>;
  makeRequest: () => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<CurrentUser>();

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
