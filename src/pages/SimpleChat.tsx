import { Channel, CurrentUser } from 'chatkitty';
import ChannelHeader from 'components/ChannelHeader';
import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import { useCurrentUser, useJoinedChannels } from 'hooks';
import { useState } from 'react';

const Preload: React.FC = () => {
  const { isLoading: loadingChannels, resource: channels } =
    useJoinedChannels();
  const { isLoading: loadingUser, resource: currentUser } = useCurrentUser();

  return (
    <>
      {loadingChannels || loadingUser || !currentUser ? (
        'Loading...'
      ) : (
        <SimpleChat channels={channels} currentUser={currentUser} />
      )}
    </>
  );
};

interface SimpleChatProps {
  channels: Channel[];
  currentUser: CurrentUser;
}

const SimpleChat: React.FC<SimpleChatProps> = ({ channels, currentUser }) => {
  // state (extract to hooks)
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);

  return (
    <div className="flex">
      <div className="sm:max-w-xs min-w-xs border-r border-gray-100 min-h-screen shadow-sm">
        <CurrentUserDisplay user={currentUser} />
        <ChannelList
          channels={channels}
          selectedChannel={selectedChannel}
          setSelectedChannel={setSelectedChannel}
        />
      </div>
      <div className="flex-1">
        <ChannelHeader channel={selectedChannel} />
      </div>
    </div>
  );
};

export default Preload;
