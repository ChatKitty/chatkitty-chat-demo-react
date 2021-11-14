import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetMessagesSucceededResult,
  Message,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';
import { Dispatch, SetStateAction } from 'react';

const useMessages = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message[];
  setResource: Dispatch<SetStateAction<Message[] | undefined>>;
  makeRequest: (channel: Channel) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message[]>();

  const makeRequest = async (channel: Channel) => {
    setIsLoading(true);

    const result = await kitty.getMessages({
      channel,
    });

    if (succeeded<GetMessagesSucceededResult>(result)) {
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
    setResource,
    makeRequest,
  };
};

export default useMessages;
