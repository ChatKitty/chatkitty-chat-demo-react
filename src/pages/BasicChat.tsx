import { Channel } from 'chatkitty';
import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import JoinChannelModal from 'components/JoinChannelModal';
import {
  useCurrentUser,
  useJoinChannel,
  useJoinedChannels,
  useLeaveChannel,
  useMessages,
  useSendMessageDraft,
  useUpdateMessageDraft,
} from 'hooks';
import ChannelDetail from 'pages/ChannelDetail';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

export type SelectedModal = 'join' | undefined;

const BasicChat: React.FC = () => {
  const {
    isLoading: loadingChannels,
    resource: channels,
    makeRequest: fetchChannels,
  } = useJoinedChannels();
  const { resource: currentUser } = useCurrentUser();
  const { makeRequest: leaveChannel } = useLeaveChannel();
  const { makeRequest: joinChannel } = useJoinChannel();
  const { makeRequest: updateMessageDraft } = useUpdateMessageDraft();
  const { makeRequest: sendMessageDraft } = useSendMessageDraft();

  const {
    isLoading: messagesLoading,
    resource: messages,
    setResource: setMessages,
    makeRequest: fetchChannelMessages,
  } = useMessages();

  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [selectedModal, setSelectedModal] = useState<SelectedModal>();

  useEffect(() => {
    // fetch or change selected channel on channel list change
    if (selectedChannel) {
      const initChannel = async () => {
        await fetchChannelMessages(selectedChannel);
      };
      initChannel();
    } else {
      if (channels.length > 0) {
        const defaultChannel = channels[0];
        setSelectedChannel(defaultChannel);
      }
    }

    // reset selected channels if no available channels
    if (channels.length === 0) {
      setSelectedChannel(undefined);
    }
  }, [selectedChannel, channels]);

  return (
    <div className="flex">
      <div className="w-full sm:w-80 min-h-screen">
        <CurrentUserDisplay loading={!currentUser} user={currentUser} />
        <ChannelList
          loading={loadingChannels}
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

      <div className="flex flex-col flex-1 rounded-lg overflow-hidden max-h-screen min-h-screen">
        {selectedChannel ? (
          <ChannelDetail
            channel={selectedChannel}
            messagesLoading={messagesLoading}
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessageDraft}
            updateMessage={updateMessageDraft}
          />
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
          'Invalid Modal'
        )}
      </Modal>
    </div>
  );
};

export default BasicChat;
