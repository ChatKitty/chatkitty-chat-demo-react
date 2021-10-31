import Login from 'pages/Login';
import SimpleChat from 'pages/SimpleChat';

const App: React.FC = () => {
  return <Login entrypoint={SimpleChat}></Login>;
};

export default App;
