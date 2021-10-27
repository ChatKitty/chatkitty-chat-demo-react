import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  GetUnreadChannelsFilter,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUnreadChannelsCount = (
  filter: GetUnreadChannelsFilter
): {
  isLoading: boolean;
  error?: ChatKittyError;
  result: number;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState(0);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUnreadChannelsCount({ filter });

      if (succeeded<GetCountSucceedResult>(result)) {
        setResult(result.count);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
    result,
  };
};

export default useUnreadChannelsCount;
