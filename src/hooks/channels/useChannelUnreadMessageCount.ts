import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useChannelUnreadMessageCount = (
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  result?: number;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState(0);

  useEffect(() => {
    const startSession = async () => {
      setIsLoading(true);

      const result = await kitty.getUnreadMessagesCount({
        channel,
      });

      if (succeeded<GetCountSucceedResult>(result)) {
        setResult(result.count);
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
    result,
  };
};

export default useChannelUnreadMessageCount;
