import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  Message,
  SentMessageResult,
  succeeded,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useSendMessageDraft = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: Message;
  makeRequest: (channel: Channel, draft: string) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<Message>();

  const makeRequest = async (channel: Channel, draft: string) => {
    setIsLoading(true);

    const result = await kitty.sendMessage({
      channel: channel,
      body: draft,
    });

    if (succeeded<SentMessageResult>(result)) {
      setResource(result.message);
    }

    if (failed<ChatKittyFailedResult>(result)) {
      console.log(result.error);
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

export default useSendMessageDraft;
