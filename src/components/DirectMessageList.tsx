import { Channel, CurrentUser, DirectChannel } from 'chatkitty';
import DirectMessageListHeader from 'components/DirectMessageListHeader';
import DirectMessageListItem from 'components/DirectMessageListItem';
import { SelectedModal } from 'pages/BasicChat';

interface DirectMessageListProps {
  currentUser: CurrentUser;
  loading: boolean;
  channels: DirectChannel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: DirectChannel) => void;
  handleExtraActionClick: (channel: DirectChannel) => void;
  setSelectedModal: (modal?: SelectedModal) => void;
}

const DirectMessageList: React.FC<DirectMessageListProps> = ({
  currentUser,
  loading,
  channels,
  selectedChannel,
  handleChannelClick,
  handleExtraActionClick,
  setSelectedModal,
}) => {
  return loading ? (
    <>LOADING...</>
  ) : (
    <>
      <DirectMessageListHeader setSelectedModal={setSelectedModal} />
      {channels.length > 0 &&
        channels.map((channel) => (
          <DirectMessageListItem
            key={channel.id}
            currentUser={currentUser}
            channel={channel}
            selected={channel.id === selectedChannel?.id}
            handleClick={handleChannelClick}
            handleExtraActionClick={handleExtraActionClick}
          />
        ))}
    </>
  );
};

export default DirectMessageList;
