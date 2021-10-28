import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import { useCurrentUser, useJoinedChannels } from 'hooks';

const SimpleChat: React.FC = () => {
  const { isLoading: loadingChannels, resource: channels } =
    useJoinedChannels();

  const { isLoading: loadingUser, resource: currentUser } = useCurrentUser();

  return (
    <>
      <div className="sm:max-w-xs min-w-xs border-r min-h-screen">
        <CurrentUserDisplay loading={loadingUser} user={currentUser} />
        <ChannelList loading={loadingChannels} channels={channels} />
      </div>
    </>
  );
};

export default SimpleChat;
