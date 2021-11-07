import {
  Channel,
  CreateChannelRequest,
  DirectChannel,
  isDirectChannel,
  isPublicChannel,
  PublicChannel,
} from 'chatkitty';
import ChannelList from 'components/ChannelList';
import CurrentUserDisplay from 'components/CurrentUserDisplay';
import DirectMessageList from 'components/DirectMessageList';
import DirectMessageModal from 'components/DirectMessageModal';
import JoinChannelModal from 'components/JoinChannelModal';
import {
  useCreateChannel,
  useCurrentUser,
  useHideChannel,
  useJoinChannel,
  useJoinedChannels,
  useLeaveChannel,
  useMessages,
  useSendMessageDraft,
  useUpdateMessageDraft,
} from 'hooks';
import ChatSession from 'pages/ChatSession';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';

export type SelectedModal = 'join' | 'directMessage' | undefined;

const BasicChat: React.FC = () => {
  const {
    isLoading: loadingChannels,
    resource: channels,
    makeRequest: fetchChannels,
  } = useJoinedChannels();
  const { resource: currentUser } = useCurrentUser();
  const { makeRequest: leaveChannel } = useLeaveChannel();
  const { makeRequest: joinChannel } = useJoinChannel();
  const { makeRequest: hideChannel } = useHideChannel();
  const { makeRequest: createChannel } = useCreateChannel();
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

  // filters
  const directChannels = channels.filter((channel) =>
    isDirectChannel(channel)
  ) as DirectChannel[];

  const publicChannels = channels.filter((channel) =>
    isPublicChannel(channel)
  ) as PublicChannel[];

  // modal selection
  let modalContent = <>invalid modal</>;

  if (selectedModal === 'join') {
    modalContent = (
      <JoinChannelModal
        closeModal={() => setSelectedModal(undefined)}
        joinChannel={async (channel) => {
          await joinChannel(channel);
          await fetchChannels();
          setSelectedChannel(channel);
        }}
      />
    );
  } else if (selectedModal === 'directMessage') {
    modalContent = (
      <DirectMessageModal
        currentUser={currentUser}
        channels={directChannels}
        closeModal={() => setSelectedModal(undefined)}
        createChannel={async (params: CreateChannelRequest) => {
          const channel = await createChannel(params);

          if (channel) {
            await fetchChannels();
            setSelectedChannel(channel);
          }
        }}
        setSelectedChannel={setSelectedChannel}
      />
    );
  }

  // presentational
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  if (!currentUser) {
    return <>LOADING...</>;
  }

  return (
    <div className="flex w-full h-full">
      <div
        className={`webkit-fill w-full h-full sm:w-80 overflow-hidden
        transition transform-gpu duration-300 ease-in-out bg-white sm:-translate-x-0
        ${sidePanelOpen ? '-translate-x-0' : '-translate-x-full'} z-10
        flex flex-col
        `}
      >
        <CurrentUserDisplay
          user={currentUser}
          onClose={() => {
            setSidePanelOpen(false);
          }}
        />
        <ul className="flex-1 flex flex-col overflow-y-scroll webkit-scroll">
          <ChannelList
            loading={loadingChannels}
            channels={publicChannels}
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
          <DirectMessageList
            currentUser={currentUser}
            loading={loadingChannels}
            channels={directChannels}
            selectedChannel={selectedChannel}
            handleChannelClick={(channel: Channel) => {
              setSelectedChannel(channel);
              setSidePanelOpen(false);
            }}
            handleExtraActionClick={async (channel) => {
              await hideChannel(channel);
              await fetchChannels();
            }}
            setSelectedModal={setSelectedModal}
          />
        </ul>
      </div>

      <div
        className={`webkit-fill w-full h-full fixed sm:static flex flex-col flex-1 rounded-lg overflow-hidden`}
      >
        {selectedChannel ? (
          <ChatSession
            currentUser={currentUser}
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
        className={`flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-30`}
        style={{ overlay: { zIndex: 100 } }}
        isOpen={!!selectedModal}
        onRequestClose={() => setSelectedModal(undefined)}
        appElement={document.getElementById('app') || undefined}
      >
        {modalContent}
      </Modal>
    </div>
  );
};

export default BasicChat;
