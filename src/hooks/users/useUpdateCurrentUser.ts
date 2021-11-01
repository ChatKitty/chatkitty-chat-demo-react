import {
  ChatKittyError,
  ChatKittyFailedResult,
  CurrentUser,
  failed,
  succeeded,
  UpdateCurrentUserResult,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useUpdateCurrentUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  makeRequest: (update: (user: CurrentUser) => CurrentUser) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();

  const makeRequest = async (update: (user: CurrentUser) => CurrentUser) => {
    setIsLoading(true);

    const result = await kitty.updateCurrentUser(update);

    if (succeeded<UpdateCurrentUserResult>(result)) {
      // empty response
    }

    if (failed<ChatKittyFailedResult>(result)) {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    makeRequest,
  };
};

export default useUpdateCurrentUser;
