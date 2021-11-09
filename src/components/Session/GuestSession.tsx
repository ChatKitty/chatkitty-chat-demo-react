import { useGuestSession } from 'hooks';

interface LoginProps {
  children: React.ReactNode;
}

const GuestSession: React.FC<LoginProps> = ({ children }: LoginProps) => {
  const { isLoading } = useGuestSession();
  return <>{isLoading ? <p>Starting Chatkitty Session...</p> : children}</>;
};

export default GuestSession;
