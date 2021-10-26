import {
  ChatKittyError,
  ChatKittyFailedResult,
  ChatKittyUploadProgressListener,
  CreateChatKittyFileProperties,
  CurrentUser,
  failed,
  succeeded,
  UpdatedCurrentUserResult,
} from 'chatkitty';
import kitty from 'clients/kitty';
import { useEffect, useState } from 'react';

const useUpdateCurrentUserDisplayPicture = ({
  file,
  progressListener,
}: {
  file: CreateChatKittyFileProperties;
  progressListener: ChatKittyUploadProgressListener;
}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<CurrentUser>();

  useEffect(() => {
    const makeRequest = async () => {
      setIsLoading(true);

      const result = await kitty.updateCurrentUserDisplayPicture({
        file,
        progressListener,
      });

      if (succeeded<UpdatedCurrentUserResult>(result)) {
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

export default useUpdateCurrentUserDisplayPicture;
