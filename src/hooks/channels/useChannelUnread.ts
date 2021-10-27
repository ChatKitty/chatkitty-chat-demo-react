import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelUnreadSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useChannelUnread = (
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  result: boolean;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getChannelUnread({
        channel,
      });

      if (succeeded<GetChannelUnreadSucceededResult>(result)) {
        setResult(result.unread);
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
    result,
  };
};

export default useChannelUnread;
