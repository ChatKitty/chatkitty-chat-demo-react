import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  InviteUserResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useInviteUser = ({
  channel,
  user,
}: {
  channel: Channel;
  user: User;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.inviteUser({
        channel,
        user,
      });

      if (succeeded<InviteUserResult>(result)) {
        // empty response
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    makeRequest();
  }, []);

  return {
    isLoading,
    error,
  };
};

export default useInviteUser;
