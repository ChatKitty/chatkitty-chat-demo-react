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
import ChannelDetail from 'pages/ChatSession';
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

  // presentational
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  return (
    <div className="flex w-100">
      <div
        className={`w-100 sm:w-80 min-h-screen overflow-hidden
        transition transform-gpu duration-300 ease-in-out bg-white sm:-translate-x-0
        ${sidePanelOpen ? '-translate-x-0' : '-translate-x-full'} z-10
        `}
      >
        <CurrentUserDisplay
          loading={!currentUser}
          user={currentUser}
          onClose={() => {
            console.log(sidePanelOpen);
            setSidePanelOpen(false);
          }}
        />
        <ChannelList
          loading={loadingChannels}
          channels={channels}
          selectedChannel={selectedChannel}
          handleChannelClick={(channel: Channel) => {
            setSelectedChannel(channel);
            setSidePanelOpen(false);
          }}
          handleExtraActionClick={async (channel) => {
            await leaveChannel(channel);
            await fetchChannels();
          }}
          setSelectedModal={setSelectedModal}
        />
      </div>

      <div
        className={`w-full fixed sm:static flex flex-col flex-1 rounded-lg overflow-hidden max-h-screen min-h-screen`}
      >
        {selectedChannel ? (
          <ChannelDetail
            channel={selectedChannel}
            messagesLoading={messagesLoading}
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessageDraft}
            updateMessage={updateMessageDraft}
            setSidePanelOpen={() => setSidePanelOpen(true)}
          />
        ) : (
          'No Channel Selected.'
        )}
      </div>

      {/* Modal */}
      <Modal
        className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-30"
        style={{ overlay: { zIndex: 100 } }}
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
