import { Channel, CurrentUser } from 'chatkitty';
import ChannelHeader from 'components/ChannelHeader';
import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import MessageList from 'components/MessageList';
import { useCurrentUser, useJoinedChannels, useMessages } from 'hooks';
import { useEffect, useState } from 'react';

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
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);

  const {
    isLoading: messagesLoading,
    resource: messages,
    makeRequest: fetchChannelMessages,
  } = useMessages();

  useEffect(() => {
    fetchChannelMessages(selectedChannel);
  }, [selectedChannel]);

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
        {messagesLoading ? 'Loading...' : <MessageList messages={messages} />}
      </div>
    </div>
  );
};

export default Preload;
