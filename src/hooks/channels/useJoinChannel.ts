import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  JoinedChannelResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useJoinChannel = (
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.joinChannel({ channel });

      if (succeeded<JoinedChannelResult>(result)) {
        setResource(result.channel);
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

export default useJoinChannel;
