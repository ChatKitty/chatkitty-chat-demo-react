import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  DirectChannel,
  failed,
  HideChannelSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useHideChannel = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: DirectChannel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel>();

  const makeRequest = async (channel: DirectChannel) => {
    setIsLoading(true);

    const result = await kitty.hideChannel({ channel });

    if (succeeded<HideChannelSucceededResult>(result)) {
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

export default useHideChannel;
