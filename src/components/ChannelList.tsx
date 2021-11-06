import { Channel } from 'chatkitty';
import ChannelListHeader from 'components/ChannelListHeader';
import ChannelListItem from 'components/ChannelListItem';
import { SelectedModal } from 'pages/BasicChat';

interface ChannelListProps {
  loading: boolean;
  channels: Channel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: Channel) => void;
  handleExtraActionClick: (channel: Channel) => void;
  setSelectedModal: (modal?: SelectedModal) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
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
    <ul className="flex flex-col">
      <ChannelListHeader setSelectedModal={setSelectedModal} />
      {channels.length > 0 &&
        channels.map((channel) => (
          <ChannelListItem
            key={channel.id}
            channel={channel}
            selected={channel.id === selectedChannel?.id}
            handleClick={handleChannelClick}
            handleExtraActionClick={handleExtraActionClick}
          />
        ))}
    </ul>
  );
};

export default ChannelList;
