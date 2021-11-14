import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetReactionsSucceededResult,
  Message,
  Reaction,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useReactionsForMessage = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction[];
  makeRequest: (message: Message) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Reaction[]>();

  const makeRequest = async (message: Message) => {
    setIsLoading(true);

    const result = await kitty.getReactions({ message });

    if (succeeded<GetReactionsSucceededResult>(result)) {
      setResource(result.paginator.items);
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

export default useReactionsForMessage;
