import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  ReadMessageSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useReadMessage = (
  message: Message
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Message>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.readMessage({ message });

    if (succeeded<ReadMessageSucceededResult>(result)) {
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

export default useReadMessage;
