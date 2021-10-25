import { Channel } from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUpdateMessageDraft = (
  channel: Channel,
  draft: string
): {
  isLoading: boolean;
  resource?: Channel;
} => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const startSession = async () => {
      setIsLoading(true);

      await kitty.sendKeystrokes({ channel, keys: draft });

      // TODO: this API doesn't have response or error types.

      setIsLoading(false);
    };

    startSession();
  }, []);

  return {
    isLoading,
  };
};

export default useUpdateMessageDraft;
