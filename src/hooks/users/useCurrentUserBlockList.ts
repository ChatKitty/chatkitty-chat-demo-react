import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserBlockListSucceededResult,
  succeeded,
  UserBlockListItem,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useCurrentUserBlockList = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: UserBlockListItem[];
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<UserBlockListItem[]>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUserBlockList();

      if (succeeded<GetUserBlockListSucceededResult>(result)) {
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

export default useCurrentUserBlockList;
