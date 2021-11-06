import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserIsChannelMemberSucceededResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useUserIsChannelMember = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  result: boolean;
  makeRequest: (channel: Channel, user: User) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [result, setResult] = useState<boolean>(false);

  const makeRequest = async (channel: Channel, user: User) => {
    setIsLoading(true);

    const result = await kitty.getUserIsChannelMember({
      channel,
      user,
    });

    if (succeeded<GetUserIsChannelMemberSucceededResult>(result)) {
      setResult(result.isMember);
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

export default useUserIsChannelMember;
