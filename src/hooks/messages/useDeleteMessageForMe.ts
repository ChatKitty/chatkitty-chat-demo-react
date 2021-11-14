import {
  ChatKittyError,
  ChatKittyFailedResult,
  DeleteMessageForMeSucceededResult,
  failed,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useDeleteMessageForMe = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.deleteMessageForMe({ message });

    if (succeeded<DeleteMessageForMeSucceededResult>(result)) {
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

export default useDeleteMessageForMe;
