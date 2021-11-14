import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetCountSucceedResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useMessageRepliesCount = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: number;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<number>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.getMessageRepliesCount({ message });

    if (succeeded<GetCountSucceedResult>(result)) {
      setResource(result.count);
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

export default useMessageRepliesCount;
