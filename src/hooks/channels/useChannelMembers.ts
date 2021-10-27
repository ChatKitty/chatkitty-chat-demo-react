import {
  Channel,
  ChatKittyError,
  ChatKittyFailedResult,
  failed,
  GetChannelMembersFilter,
  GetUsersSucceededResult,
  succeeded,
  User,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useChannelMembers = ({
  channel,
  filter,
}: {
  channel: Channel;
  filter?: GetChannelMembersFilter;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: User[];
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<User[]>([]);

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.getChannelMembers({ channel, filter });

      if (succeeded<GetUsersSucceededResult>(result)) {
        setResource(result.paginator.items);
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

export default useChannelMembers;
