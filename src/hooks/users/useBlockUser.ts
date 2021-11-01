import {
  BlockUserSucceededResult,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useBlockUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (user: User) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<User>();

  const makeRequest = async (user: User) => {
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

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useBlockUser;
