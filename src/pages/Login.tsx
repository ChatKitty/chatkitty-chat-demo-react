import { useGuestSession } from 'hooks';

interface LoginProps {
  entrypoint: React.FC;
}

const Login: React.FC<LoginProps> = ({ entrypoint: Component }: LoginProps) => {
  const { isLoading } = useGuestSession();

  return isLoading ? <p>Loading...</p> : <Component />;
};

export default Login;
