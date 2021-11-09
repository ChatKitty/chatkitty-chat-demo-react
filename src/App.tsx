import GuestSession from 'components/Session/GuestSession';
import BasicChat from 'pages/BasicChat';

const App: React.FC = () => {
  return (
    <GuestSession>
      <BasicChat />
    </GuestSession>
  );
};

export default App;
