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
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel[]>([]);

  const makeRequest = async () => {
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

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useJoinedChannels;
