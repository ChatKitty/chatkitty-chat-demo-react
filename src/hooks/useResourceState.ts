import { ChatKittyError } from 'chatkitty';
import { useState } from 'react';
import { toast } from 'react-toastify';

const useResourceState = <T>({
  defaultIsLoading = false,
}: {
  defaultIsLoading?: boolean;
} = {}): {
  isLoading: boolean;
  error?: ChatKittyError;
  resource?: T;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: (error: ChatKittyError) => void;
  setResource: React.Dispatch<React.SetStateAction<T | undefined>>;
} => {
  const [isLoading, setIsLoading] = useState(defaultIsLoading);
  const [error, setErrorBase] = useState<ChatKittyError>();
  const [resource, setResource] = useState<T>();

  const setError = (error: ChatKittyError) => {
    toast.error(error.message);
    setErrorBase(error);
  };

  return {
    isLoading,
    error,
    resource,
    setIsLoading,
    setError,
    setResource,
  };
};

export default useResourceState;
