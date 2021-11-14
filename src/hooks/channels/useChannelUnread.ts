import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelUnreadSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useChannelUnread = (
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: boolean;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<boolean>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getChannelUnread({
        channel,
      });

      if (succeeded<GetChannelUnreadSucceededResult>(result)) {
        setResource(result.unread);
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

export default useChannelUnread;
