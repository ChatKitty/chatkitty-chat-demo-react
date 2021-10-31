import { Channel } from 'chatkitty';
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

export type SelectedModal = 'join' | undefined;

const SimpleChat: React.FC = () => {
  const {
    isLoading: loadingChannels,
    resource: channels,
    makeRequest: fetchChannels,
  } = useJoinedChannels();
  const { resource: currentUser } = useCurrentUser();

  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [selectedModal, setSelectedModal] = useState<SelectedModal>();

  useEffect(() => {
    // fetch or change selected channel on channel list change
    if (selectedChannel) {
      fetchChannelMessages(selectedChannel);
    } else {
      if (channels.length > 0) {
        setSelectedChannel(channels[0]);
      }
    }

    // reset selected channels if no available channels
    if (channels.length === 0) {
      setSelectedChannel(undefined);
    }
  }, [selectedChannel, channels]);

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
        {currentUser ? (
          <CurrentUserDisplay user={currentUser} />
        ) : (
          'Loading User...'
        )}
        {loadingChannels ? (
          'Loading Channels...'
        ) : (
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
        )}
      </div>

      <div className="flex-1 m-4 ml-0 rounded-lg overflow-hidden">
        {selectedChannel ? (
          <>
            <ChannelHeader channel={selectedChannel} />
            {messagesLoading ? (
              'Loading Messages...'
            ) : (
              <MessageList messages={messages} />
            )}
          </>
        ) : (
          'No Channel Selected.'
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

export default SimpleChat;
