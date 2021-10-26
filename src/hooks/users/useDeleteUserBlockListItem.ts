import {
  ChatKittyError,
  ChatKittyFailedResult,
  DeleteUserBlockListItemSucceededResult,
  failed,
  succeeded,
  User,
  UserBlockListItem,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useState } from 'react';

const useDeleteUserBlockListItem = ({
  item,
}: {
  item: UserBlockListItem;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: () => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<User>();

  const makeRequest = async () => {
    setIsLoading(true);

    const result = await kitty.deleteUserBlockListItem({ item });

    if (succeeded<DeleteUserBlockListItemSucceededResult>(result)) {
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

export default useDeleteUserBlockListItem;
