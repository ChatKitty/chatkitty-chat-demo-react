import { useGuestSession } from 'hooks';

interface LoginProps {
  entrypoint: React.FC;
}

const Session: React.FC<LoginProps> = ({
  entrypoint: Component,
}: LoginProps) => {
  const { isLoading } = useGuestSession();

  return isLoading ? <p>Starting Chatkitty Session...</p> : <Component />;
};

export default Session;
