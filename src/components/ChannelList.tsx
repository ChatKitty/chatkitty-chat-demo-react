import { Channel } from 'chatkitty';
import ChannelListItem from 'components/ChannelListItem';

interface ChannelListProps {
  channels: Channel[];
  selectedChannel: Channel;
  setSelectedChannel: React.Dispatch<React.SetStateAction<Channel>>;
}

const ChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  setSelectedChannel,
}) => {
  return (
    <ul className="flex flex-col">
      <h1 className="p-3 font-medium">Channels</h1>
      {channels.map((channel) => (
        <ChannelListItem
          key={channel.id}
          channel={channel}
          selected={channel.id === selectedChannel.id}
          setSelectedChannel={setSelectedChannel}
        />
      ))}
    </ul>
  );
};

export default ChannelList;
