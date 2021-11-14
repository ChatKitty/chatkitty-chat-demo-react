import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  MutedChannelResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useMuteChannel = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await kitty.muteChannel({ channel });

    if (succeeded<MutedChannelResult>(result)) {
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

export default useMuteChannel;
