import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  UnmutedChannelResult,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useUnmuteChannel = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await kitty.unmuteChannel({ channel });

    if (succeeded<UnmutedChannelResult>(result)) {
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

export default useUnmuteChannel;
