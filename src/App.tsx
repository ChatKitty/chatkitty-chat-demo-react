import BasicChat from 'pages/BasicChat';
import Session from 'components/Session/GuestSession';

const App: React.FC = () => {
  return <Session entrypoint={BasicChat}></Session>;
};

export default App;
