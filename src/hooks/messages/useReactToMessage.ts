import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  ReactedToMessageResult,
  Reaction,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useReactToMessage = (
  message: Message,
  emoji: string
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Reaction>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.reactToMessage({ message, emoji });

    if (succeeded<ReactedToMessageResult>(result)) {
      setResource(result.reaction);
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

export default useReactToMessage;
