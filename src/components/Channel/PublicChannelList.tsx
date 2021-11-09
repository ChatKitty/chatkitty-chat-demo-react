import { Channel, PublicChannel } from 'chatkitty';
import PublicChannelListHeading from 'components/Channel/PublicChannelListHeading';
import PublicChannelListItem from 'components/Channel/PublicChannelListItem';
import { SelectedModal } from 'pages/BasicChat';

interface ChannelListProps {
  loading: boolean;
  channels: PublicChannel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: PublicChannel) => void;
  handleExtraActionClick: (channel: PublicChannel) => void;
  setSelectedModal: (modal?: SelectedModal) => void;
}

const PublicChannelList: React.FC<ChannelListProps> = ({
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
      <PublicChannelListHeading setSelectedModal={setSelectedModal} />
      {channels.length > 0 &&
        channels.map((channel) => (
          <PublicChannelListItem
            key={channel.id}
            channel={channel}
            selected={channel.id === selectedChannel?.id}
            handleClick={handleChannelClick}
            handleExtraActionClick={handleExtraActionClick}
          />
        ))}
    </>
  );
};

export default PublicChannelList;
