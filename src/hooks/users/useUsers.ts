import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUsersSucceededResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useUsers = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUsers();

      if (succeeded<GetUsersSucceededResult>(result)) {
        setResource(result.paginator.items);
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

export default useUsers;
