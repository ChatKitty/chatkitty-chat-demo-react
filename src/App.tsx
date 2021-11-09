import Session from 'components/Session/GuestSession';
import BasicChat from 'pages/BasicChat';

const App: React.FC = () => {
  return <Session entrypoint={BasicChat}></Session>;
};

export default App;
