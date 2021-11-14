import { sortChannels } from 'util/ChannelUtil';

import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelsSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { useEffect } from 'react';

const useJoinedChannels = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel[];
  setResource: React.Dispatch<React.SetStateAction<Channel[] | undefined>>;
  makeRequest: () => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Channel[]>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.getChannels({
      filter: { joined: true },
    });

    if (succeeded<GetChannelsSucceededResult>(result)) {
      const channels = result.paginator.items;
      sortChannels(channels);
      setResource(channels);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    resource,
    setResource,
    makeRequest,
  };
};

export default useJoinedChannels;
