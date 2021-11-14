import kitty from 'clients/kitty';
import useResourceState from 'hooks/useResourceState';

const useEndSession = (): {
  isLoading: boolean;
  makeRequest: () => void;
} => {
  const { isLoading, setIsLoading } = useResourceState();

  const makeRequest = async () => {
    setIsLoading(true);

    await kitty.endSession();

    setIsLoading(false);
  };

  return {
    isLoading,
    makeRequest,
  };
};

export default useEndSession;
