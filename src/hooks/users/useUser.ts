import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUserResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUser = (
  param: number
): {
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

      const result = await kitty.getUser(param);

      if (succeeded<GetUserResult>(result)) {
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

export default useUser;
