import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ClearChannelHistorySucceededResult,
  failed,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useClearChannelHistory = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel>();

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await kitty.clearChannelHistory({ channel });

    if (succeeded<ClearChannelHistorySucceededResult>(result)) {
      setResource(result.channel);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useClearChannelHistory;
