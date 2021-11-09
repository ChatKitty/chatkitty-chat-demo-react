import { pickDirectChannels, pickPublicChannels } from 'util/ChannelUtil';

import { Channel } from 'chatkitty';
import DirectChannelList from 'components/Channel/DirectChannelList';
import PublicChannelList from 'components/Channel/PublicChannelList';
import ChatSession from 'components/Session/ChatSession';
import CurrentUserDisplay from 'components/User/CurrentUserDisplay';
import BasicChatModal from 'pages/BasicChat/BasicChatModal';
import useEffect from 'pages/BasicChat/useEffect';
import useResources from 'pages/BasicChat/useResources';
import useState from 'pages/BasicChat/useState';

const BasicChat: React.FC = () => {
  const resources = useResources();
  const state = useState();

  useEffect(resources, state);

  const {
    loading: { fetchingCurrentUser, fetchingJoinedChannels, fetchingMessages },
    get: { currentUser, joinedChannels, messages },
    set: { setMessages },
    request: {
      leaveChannel,
      fetchJoinedChannels,
      hideChannel,
      sendMessage,
      updateMessage,
    },
  } = resources;

  if (fetchingCurrentUser || fetchingJoinedChannels || !currentUser) {
    return <>LOADING...</>;
  }

  const {
    get: { selectedChannel, sidePanelOpen },
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
        />
        <ul className="flex-1 flex flex-col overflow-y-scroll webkit-scroll">
          <PublicChannelList
            channels={pickPublicChannels(joinedChannels)}
            selectedChannel={selectedChannel}
            handleChannelClick={(channel: Channel) => {
              setSelectedChannel(channel);
              setSidePanelOpen(false);
            }}
            handleExtraActionClick={async (channel) => {
              await leaveChannel(channel);
              await fetchJoinedChannels();
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
            handleExtraActionClick={async (channel) => {
              await hideChannel(channel);
              await fetchJoinedChannels();
            }}
            setModal={setModal}
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
            messagesLoading={fetchingMessages}
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
            updateMessage={updateMessage}
            setSidePanelOpen={() => setSidePanelOpen(true)}
          />
        ) : (
          'No Channel Selected.'
        )}
      </div>

      <BasicChatModal resources={resources} state={state} />
    </div>
  );
};

export default BasicChat;
