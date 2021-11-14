import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetMessageParentSucceededResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useMessageParent = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.getMessageParent({ message });

    if (succeeded<GetMessageParentSucceededResult>(result)) {
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

export default useMessageParent;
