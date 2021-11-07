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

const useCreateChannel = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Channel;
  makeRequest: ({
    type,
    members,
    name,
  }: {
    type: string;
    members?: ChatKittyUserReference[];
    name?: string;
  }) => Promise<Channel | undefined>;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Channel>();

  const makeRequest = async ({
    type,
    members,
    name,
  }: {
    type: string;
    members?: ChatKittyUserReference[];
    name?: string;
  }) => {
    setIsLoading(true);

    const result = await kitty.createChannel({ members, name, type });

    setIsLoading(false);

    if (succeeded<CreatedChannelResult>(result)) {
      setResource(result.channel);
      return result.channel;
    }

    if (failed<ChatKittyFailedResult>(result)) {
      console.log(result);
      setError(result.error);
    }
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useCreateChannel;
