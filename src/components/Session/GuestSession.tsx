import Spinner from 'components/Utility/Spinner';
import { useGuestSession } from 'hooks';

interface LoginProps {
  children: React.ReactNode;
}

const GuestSession: React.FC<LoginProps> = ({ children }: LoginProps) => {
  const { isLoading } = useGuestSession();
  return <>{isLoading ? <Spinner /> : children}</>;
};

export default GuestSession;
