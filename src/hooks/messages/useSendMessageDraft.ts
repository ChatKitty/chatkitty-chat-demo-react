import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  SentMessageResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useSendMessageDraft = (
  channel: Channel,
  draft: string
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

    const result = await kitty.sendMessage({
      channel: channel,
      body: draft,
    });

    if (succeeded<SentMessageResult>(result)) {
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

export default useSendMessageDraft;
