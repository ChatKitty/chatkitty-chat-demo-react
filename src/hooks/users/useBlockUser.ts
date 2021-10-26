import {
  BlockUserSucceededResult,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useBlockUser = ({
  user,
}: {
  user: User;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<User>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.blockUser({
        user,
      });

      if (succeeded<BlockUserSucceededResult>(result)) {
        setResource(result.user);
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
    resource,
  };
};

export default useBlockUser;
