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

const useJoinedChannels = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource: Channel[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel[]>([]);

  useEffect(() => {
    const startSession = async () => {
      setIsLoading(true);

      const result = await kitty.getChannels({
        filter: { joined: true },
      });

      if (succeeded<GetChannelsSucceededResult>(result)) {
        setResource(result.paginator.items);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    startSession();
  }, []);

  return {
    isLoading,
    error,
    resource,
  };
};

export default useJoinedChannels;
