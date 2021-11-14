import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  ReactedToMessageResult,
  Reaction,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useReactToMessage = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Reaction;
  makeRequest: (message: Message, emoji: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Reaction>();

  const makeRequest = async (message: Message, emoji: string) => {
    setIsLoading(true);

    const result = await kitty.reactToMessage({ message, emoji });

    if (succeeded<ReactedToMessageResult>(result)) {
      setResource(result.reaction);
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

export default useReactToMessage;
