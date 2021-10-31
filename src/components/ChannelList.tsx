import { Channel } from 'chatkitty';
import ChannelListHeader from 'components/ChannelListHeader';
import ChannelListItem from 'components/ChannelListItem';
import { SelectedModal } from 'pages/SimpleChat';

interface ChannelListProps {
  channels: Channel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: Channel) => void;
  handleExtraActionClick: (channel: Channel) => void;
  setSelectedModal: (modal?: SelectedModal) => void;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  handleChannelClick,
  handleExtraActionClick,
  setSelectedModal,
}) => {
  return (
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
