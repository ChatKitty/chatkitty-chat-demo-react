import {
  AddedChannelModeratorResult,
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useAddChannelModerator = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: (channel: Channel, user: User) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel>();

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await kitty.addChannelModerator({ channel, user });

    if (succeeded<AddedChannelModeratorResult>(result)) {
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

export default useAddChannelModerator;
