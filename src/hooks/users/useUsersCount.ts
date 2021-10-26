import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUsersCount = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  result?: number;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState<number>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getUsersCount();

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

export default useUsersCount;
