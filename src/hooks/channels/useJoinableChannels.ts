import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelsSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useJoinableChannels = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource: Channel[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel[]>([]);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getChannels({
        filter: { joined: false },
      });

      if (succeeded<GetChannelsSucceededResult>(result)) {
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

export default useJoinableChannels;
