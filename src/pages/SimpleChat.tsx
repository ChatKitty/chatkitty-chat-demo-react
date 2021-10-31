import { Channel, CurrentUser } from 'chatkitty';
import ChannelHeader from 'components/ChannelHeader';
import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import JoinChannelModal from 'components/JoinChannelModal';
import MessageList from 'components/MessageList';
import {
  useCurrentUser,
  useJoinChannel,
  useJoinedChannels,
  useLeaveChannel,
  useMessages,
} from 'hooks';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Preload: React.FC = () => {
  const {
    isLoading: loadingChannels,
    resource: channels,
    makeRequest: fetchChannels,
  } = useJoinedChannels();
  const { isLoading: loadingUser, resource: currentUser } = useCurrentUser();

  return (
    <>
      {loadingChannels || loadingUser || !currentUser ? (
        'Loading...'
      ) : (
        <SimpleChat
          channels={channels}
          fetchChannels={fetchChannels}
          currentUser={currentUser}
        />
      )}
    </>
  );
};

interface SimpleChatProps {
  channels: Channel[];
  fetchChannels: () => void;
  currentUser: CurrentUser;
}

export type SelectedModal = 'join' | undefined;

const SimpleChat: React.FC<SimpleChatProps> = ({
  channels,
  fetchChannels,
  currentUser,
}) => {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);
  const [selectedModal, setSelectedModal] = useState<SelectedModal>();

  useEffect(() => {
    if (selectedChannel) {
      fetchChannelMessages(selectedChannel);
    }
  }, [selectedChannel]);

  const {
    isLoading: messagesLoading,
    resource: messages,
    makeRequest: fetchChannelMessages,
  } = useMessages();

  const { makeRequest: leaveChannel } = useLeaveChannel();
  const { makeRequest: joinChannel } = useJoinChannel();

  return (
    <div className="flex">
      <div className="w-full sm:w-80 min-h-screen">
        <CurrentUserDisplay user={currentUser} />
        <ChannelList
          channels={channels}
          selectedChannel={selectedChannel}
          handleChannelClick={setSelectedChannel}
          handleExtraActionClick={async (channel) => {
            await leaveChannel(channel);
            await fetchChannels();
          }}
          setSelectedModal={setSelectedModal}
        />
      </div>
      <div className="flex-1 m-4 ml-0 rounded-lg overflow-hidden">
        {selectedChannel ? (
          <>
            <ChannelHeader channel={selectedChannel} />
            {messagesLoading ? (
              'Loading...'
            ) : (
              <MessageList messages={messages} />
            )}
          </>
        ) : (
          ''
        )}
      </div>

      {/* Modal */}
      <Modal
        className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-30"
        isOpen={!!selectedModal}
        onRequestClose={() => setSelectedModal(undefined)}
        appElement={document.getElementById('app') || undefined}
      >
        {selectedModal === 'join' ? (
          <JoinChannelModal
            closeModal={() => setSelectedModal(undefined)}
            joinChannel={async (channel) => {
              await joinChannel(channel);
              await fetchChannels();
            }}
          />
        ) : (
          ''
        )}
      </Modal>
    </div>
  );
};

export default Preload;
