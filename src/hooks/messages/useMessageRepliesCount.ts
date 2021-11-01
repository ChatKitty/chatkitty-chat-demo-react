import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useMessageRepliesCount = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  result: number;
  makeRequest: (message: Message) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState(0);

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.getMessageRepliesCount({ message });

    if (succeeded<GetCountSucceedResult>(result)) {
      setResult(result.count);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    result,
    makeRequest,
  };
};

export default useMessageRepliesCount;
