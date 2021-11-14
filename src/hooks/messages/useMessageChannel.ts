import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetMessageChannelSucceededResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useMessageChannel = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.getMessageChannel({ message });

    if (succeeded<GetMessageChannelSucceededResult>(result)) {
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

export default useMessageChannel;
