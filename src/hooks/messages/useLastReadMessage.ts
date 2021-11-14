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
import useResourceState from 'hooks/useResourceState';

const useLastReadMessage = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, username: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

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
