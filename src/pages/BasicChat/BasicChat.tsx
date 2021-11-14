import { pickDirectChannels, pickPublicChannels } from 'util/ChannelUtil';

import { Channel, isDirectChannel } from 'chatkitty';
import DirectChannelHeader from 'components/Channel/DirectChannelHeader';
import DirectChannelList from 'components/Channel/DirectChannelList';
import EmptyChannelHeader from 'components/Channel/EmptyChannelHeader';
import PublicChannelHeader from 'components/Channel/PublicChannelHeader';
import PublicChannelList from 'components/Channel/PublicChannelList';
import MessageInput from 'components/Message/MessageInput';
import MessageList from 'components/Message/MessageList';
import ChatSession from 'components/Session/ChatSession';
import CurrentUserDisplay from 'components/User/CurrentUserDisplay';
import Spinner from 'components/Utility/Spinner';
import BasicChatModal from 'pages/BasicChat/BasicChatModal';
import useEffect from 'pages/BasicChat/useEffect';
import useResources from 'pages/BasicChat/useResources';
import useState from 'pages/BasicChat/useState';
import { animateScroll as scroll } from 'react-scroll';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasicChat: React.FC = () => {
  const resources = useResources();
  const state = useState();

  const {
    loading: { fetchingCurrentUser, fetchingJoinedChannels, fetchingMessages },
    get: { currentUser, joinedChannels, messages },
    set: { setMessages },
    request: { leaveChannel, hideChannel, sendMessage, updateMessage },
  } = resources;

  useEffect(resources, state);

  if (
    fetchingCurrentUser ||
    fetchingJoinedChannels ||
    !currentUser ||
    !joinedChannels
  ) {
    return <Spinner />;
  }

  const {
    get: { selectedChannel, sidePanelOpen, online },
    set: { setSelectedChannel, setSidePanelOpen, setModal },
  } = state;

  return (
    <div className="flex w-full h-full">
      <div
        className={`webkit-fill w-full h-full sm:w-80 overflow-hidden transition transform-gpu duration-300 ease-in-out bg-white sm:-translate-x-0
        ${
          sidePanelOpen ? '-translate-x-0' : '-translate-x-full'
        } z-10 flex flex-col `}
      >
        <CurrentUserDisplay
          user={currentUser}
          onClose={() => {
            setSidePanelOpen(false);
          }}
          online={online}
        />
        <ul className="flex-1 flex flex-col overflow-y-auto webkit-scroll">
          <PublicChannelList
            channels={pickPublicChannels(joinedChannels)}
            selectedChannel={selectedChannel}
            handleChannelClick={(channel: Channel) => {
              setSelectedChannel(channel);
              setSidePanelOpen(false);
            }}
            handleExtraActionClick={async (channel) => {
              await leaveChannel(channel);
            }}
            setModal={setModal}
          />
          <DirectChannelList
            currentUser={currentUser}
            channels={pickDirectChannels(joinedChannels)}
            selectedChannel={selectedChannel}
            handleChannelClick={(channel: Channel) => {
              setSelectedChannel(channel);
              setSidePanelOpen(false);
            }}
            handleExtraActionClick={hideChannel}
            setModal={setModal}
          />
        </ul>
      </div>

      <div
        className={`webkit-fill w-full h-full fixed sm:static flex flex-col flex-1 rounded-lg overflow-hidden`}
      >
        {selectedChannel ? (
          <ChatSession
            channel={selectedChannel}
            onMessageReceived={(message) => {
              setMessages((prev) => [message, ...(prev || [])]);
            }}
          >
            {isDirectChannel(selectedChannel) ? (
              <DirectChannelHeader
                currentUser={currentUser}
                channel={selectedChannel}
                onPrevious={() => setSidePanelOpen(true)}
              />
            ) : (
              <PublicChannelHeader
                channel={selectedChannel}
                onPrevious={() => setSidePanelOpen(true)}
              />
            )}
            <MessageList loading={fetchingMessages} messages={messages || []} />
            <MessageInput
              channel={selectedChannel}
              sendMessage={(...args) => {
                sendMessage(...args);
                scroll.scrollToBottom({
                  containerId: 'messageList',
                });
              }}
              updateMessage={updateMessage}
            />
          </ChatSession>
        ) : (
          <EmptyChannelHeader onPrevious={() => setSidePanelOpen(true)} />
        )}
      </div>

      <BasicChatModal resources={resources} state={state} />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default BasicChat;
