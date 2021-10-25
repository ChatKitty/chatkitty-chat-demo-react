import {
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetUsersSucceededResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUsers = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  users: User[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const startSession = async () => {
      setIsLoading(true);

      const result = await kitty.getUsers();

      if (succeeded<GetUsersSucceededResult>(result)) {
        setUsers(result.paginator.items);
      }

      if (failed<ChatKittyFailedResult>(result)) {
        setError(result.error);
      }

      setIsLoading(false);
    };

    startSession();
  }, []);

  return {
    isLoading,
    error,
    users,
  };
};

export default useUsers;
