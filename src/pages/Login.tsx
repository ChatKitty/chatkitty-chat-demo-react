import { useGuestSession } from 'hooks';

type LoginProps = {
  children?: React.ReactNode;
};

const Login: React.FC = ({ children }: LoginProps) => {
  const { isLoading } = useGuestSession();

  return <>{isLoading ? <p>Loading...</p> : children}</>;
};

export default Login;
