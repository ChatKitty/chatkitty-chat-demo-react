import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  ChatSession,
  failed,
  Message,
  StartedChatSessionResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useChatSession = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: ChatSession;
  makeRequest: (
    channel: Channel,
    onReceivedMessage: (message: Message) => void
  ) => ChatSession;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<ChatSession>();

  const makeRequest = (
    channel: Channel,
    onReceivedMessage: (message: Message) => void
  ) => {
    setIsLoading(true);

    const result = kitty.startChatSession({ channel, onReceivedMessage });

    setIsLoading(false);

    if (succeeded<StartedChatSessionResult>(result)) {
      setResource(result.session);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    return result.session;
  };

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useChatSession;
