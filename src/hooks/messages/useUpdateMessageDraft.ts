import { Channel } from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useUpdateMessageDraft = (): {
  isLoading: boolean;
  makeRequest: (channel: Channel, draft: string) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);

  const makeRequest = async (channel: Channel, draft: string) => {
    setIsLoading(true);

    await kitty.sendKeystrokes({ channel, keys: draft });

    // TODO: this API doesn't have response or error types.

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useUpdateMessageDraft;
