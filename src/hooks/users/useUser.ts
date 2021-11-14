import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useUser = (
  param: number
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUser(param);

      if (succeeded<GetUserResult>(result)) {
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

export default useUser;
