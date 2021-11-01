import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetMessagesSucceededResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { Dispatch, SetStateAction, useState } from 'react';

const useMessages = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource: Message[];
  setResource: Dispatch<SetStateAction<Message[]>>;
  makeRequest: (channel: Channel) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Message[]>([]);

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await kitty.getMessages({
      channel,
    });

    if (succeeded<GetMessagesSucceededResult>(result)) {
      setResource(result.paginator.items);
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
    setResource,
    makeRequest,
  };
};

export default useMessages;
