import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserBlockListSucceededResult,
  succeeded,
  UserBlockListItem,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useCurrentUserBlockList = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: UserBlockListItem[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<UserBlockListItem[]>();

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
