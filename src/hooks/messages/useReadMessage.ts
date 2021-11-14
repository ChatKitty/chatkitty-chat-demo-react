import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  ReadMessageSucceededResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useReadMessage = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.readMessage({ message });

    if (succeeded<ReadMessageSucceededResult>(result)) {
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

export default useReadMessage;
