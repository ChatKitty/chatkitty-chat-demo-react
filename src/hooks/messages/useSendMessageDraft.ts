import { Channel } from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useSendMessageDraft = (
  channel: Channel,
  draft: string
): {
  isLoading: boolean;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async () => {
    setIsLoading(true);

    await kitty.sendMessage({
      channel: channel,
      body: draft,
    });

    // TODO: this API doesn't have response or error types.

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useSendMessageDraft;
