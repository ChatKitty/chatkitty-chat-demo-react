import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetLastReadMessageResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useLastReadMessage = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, username: string) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Message>();

  const makeRequest = async (channel: Channel, username: string) => {
    setIsLoading(true);

    const result = await kitty.getLastReadMessage({ channel, username });

    if (succeeded<GetLastReadMessageResult>(result)) {
      setResource(result.message);
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

export default useLastReadMessage;
