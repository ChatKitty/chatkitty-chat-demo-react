import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetMessageParentSucceededResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useMessageParent = (
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

    const result = await kitty.getMessageParent({ message });

    if (succeeded<GetMessageParentSucceededResult>(result)) {
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

export default useMessageParent;
