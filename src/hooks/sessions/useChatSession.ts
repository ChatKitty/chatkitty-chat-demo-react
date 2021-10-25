import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  StartedChatSessionResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useChatSession = (
  channel: Channel,
  onReceivedMessage: (message: Message) => void
): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();

  useEffect(() => {
    const startSession = async () => {
      setIsLoading(true);

      const result = kitty.startChatSession({ channel, onReceivedMessage });

      if (succeeded<StartedChatSessionResult>(result)) {
        // suceeded
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
  };
};

export default useChatSession;
