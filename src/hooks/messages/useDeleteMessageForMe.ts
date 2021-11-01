import {
  ChatKittyError,
  ChatKittyFailedResult,
  DeleteMessageForMeSucceededResult,
  failed,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useDeleteMessageForMe = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (message: Message) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Message>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.deleteMessageForMe({ message });

    if (succeeded<DeleteMessageForMeSucceededResult>(result)) {
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

export default useDeleteMessageForMe;
