import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyUserReference,
  CreatedChannelResult,
  failed,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useCreateChannel = ({
  type,
  members,
  name,
}: {
  type: string;
  members?: ChatKittyUserReference[];
  name?: string;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.createChannel({ members, name, type });

    if (succeeded<CreatedChannelResult>(result)) {
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

export default useCreateChannel;
