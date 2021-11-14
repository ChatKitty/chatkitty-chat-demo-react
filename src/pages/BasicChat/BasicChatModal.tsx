import { pickDirectChannels, sortChannels } from 'util/ChannelUtil';

import { CreateChannelRequest, CurrentUser } from 'chatkitty';
import JoinChannelModal from 'components/Modal/JoinChannelModal';
import JoinDirectChannelModal from 'components/Modal/JoinDirectChannelModal';
import { BasicChatResources } from 'pages/BasicChat/useResources';
import { BasicChatState } from 'pages/BasicChat/useState';
import ReactModal from 'react-modal';

interface BasicChatModalProps {
  resources: BasicChatResources;
  state: BasicChatState;
}

const BasicChatModal: React.FC<BasicChatModalProps> = ({
  resources,
  state,
}) => {
  const {
    get: { currentUser, joinedChannels },
    set: { setJoinedChannels },
    request: { joinChannel, createChannel },
  } = resources;

  const {
    get: { modal },
    set: { setSelectedChannel, setSidePanelOpen, setModal },
  } = state;

  let modalContent = <>invalid modal</>;

  if (modal === 'public') {
    modalContent = (
      <JoinChannelModal
        closeModal={() => setModal(undefined)}
        joinChannel={async (channel) => {
          await joinChannel(channel);
          setSelectedChannel(channel);
          setSidePanelOpen(false);
        }}
      />
    );
  } else if (modal === 'direct') {
    modalContent = (
      <JoinDirectChannelModal
        currentUser={currentUser as CurrentUser} // guarded at parent
        channels={pickDirectChannels(joinedChannels || [])}
        closeModal={() => setModal(undefined)}
        createChannel={async (params: CreateChannelRequest) => {
          const channel = await createChannel(params);

          if (channel) {
            setJoinedChannels((prev) => {
              const next = [...(prev || []), channel];
              sortChannels(next);
              return next;
            });
            setSelectedChannel(channel);
            setSidePanelOpen(false);
          }
        }}
        setSelectedChannel={(channel) => {
          setSelectedChannel(channel);
          setSidePanelOpen(false);
        }}
      />
    );
  }

  return (
    <ReactModal
      className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-30"
      style={{ overlay: { zIndex: 100 } }}
      isOpen={!!modal}
      onRequestClose={() => setModal(undefined)}
      appElement={document.getElementById('app') || undefined}
    >
      {modalContent}
    </ReactModal>
  );
};

export default BasicChatModal;
