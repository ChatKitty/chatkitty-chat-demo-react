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
import { useEffect, useState } from 'react';

const useMessages = (
  channel: Channel
): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource: Message[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<Message[]>([]);

  useEffect(() => {
    const startSession = async () => {
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

    startSession();
  }, []);

  return {
    isLoading,
    error,
    resource,
  };
};

export default useMessages;
