import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useUsersCount = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: number;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<number>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUsersCount();

      if (succeeded<GetCountSucceedResult>(result)) {
        setResource(result.count);
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

export default useUsersCount;
