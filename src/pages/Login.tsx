import { useGuestSession } from 'hooks';

type LoginProps = {
  entrypoint: React.FC;
};

const Login: React.FC<LoginProps> = ({ entrypoint: Component }: LoginProps) => {
  const { isLoading } = useGuestSession();

  return isLoading ? <p>Loading...</p> : <Component />;
};

export default Login;
