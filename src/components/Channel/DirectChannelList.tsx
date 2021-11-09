import { Channel, CurrentUser, DirectChannel } from 'chatkitty';
import DirectChannelListHeading from 'components/Channel/DirectChannelListHeading';
import DirectChannelListItem from 'components/Channel/DirectChannelListItem';
import { SelectedModal } from 'pages/BasicChat';

interface DirectChannelListProps {
  currentUser: CurrentUser;
  loading: boolean;
  channels: DirectChannel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: DirectChannel) => void;
  handleExtraActionClick: (channel: DirectChannel) => void;
  setSelectedModal: (modal?: SelectedModal) => void;
}

const DirectChannelList: React.FC<DirectChannelListProps> = ({
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
      <DirectChannelListHeading setSelectedModal={setSelectedModal} />
      {channels.length > 0 &&
        channels.map((channel) => (
          <DirectChannelListItem
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

export default DirectChannelList;
