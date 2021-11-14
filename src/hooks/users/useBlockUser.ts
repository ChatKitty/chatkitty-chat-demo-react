import {
  BlockUserSucceededResult,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useBlockUser = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User;
  makeRequest: (user: User) => void;
} => {
  const { isLoading, error, resource, setIsLoading, setError, setResource } =
    useResourceState<User>();

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
