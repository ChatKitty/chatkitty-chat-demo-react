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
import useResourceState from 'hooks/useResourceState';

const useDeleteUserBlockListItem = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (item: UserBlockListItem) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

  const makeRequest = async (item: UserBlockListItem) => {
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
