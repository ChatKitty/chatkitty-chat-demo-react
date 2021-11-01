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
import { useState } from 'react';

const useUpdateCurrentUserDisplayPicture = (): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: CurrentUser;
  makeRequest: (
    file: CreateChatKittyFileProperties,
    progressListener: ChatKittyUploadProgressListener
  ) => void;
} => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ChatKittyError>();
  const [resource, setResource] = useState<CurrentUser>();

  const makeRequest = async (
    file: CreateChatKittyFileProperties,
    progressListener: ChatKittyUploadProgressListener
  ) => {
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

  return {
    isLoading,
    error,
    resource,
    makeRequest,
  };
};

export default useUpdateCurrentUserDisplayPicture;
