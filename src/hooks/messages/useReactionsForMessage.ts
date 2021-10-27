import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetReactionsSucceededResult,
  Message,
  Reaction,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useReactionsForMessage = (
  message: Message
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction[];
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Reaction[]>([]);

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.getReactions({ message });

    if (succeeded<GetReactionsSucceededResult>(result)) {
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
    makeRequest,
  };
};

export default useReactionsForMessage;
