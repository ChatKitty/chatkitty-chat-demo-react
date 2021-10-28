import { Channel } from 'chatkitty';
import ChannelListItem from 'components/ChannelListItem';

interface ChannelListProps {
  loading: boolean;
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ loading, channels }) => {
  return (
    <ul className="flex flex-col">
      <h1 className="p-3 font-medium">Channels</h1>
      {loading
        ? 'Loading ChannelList...'
        : channels &&
          channels.map((channel) => (
            <ChannelListItem key={channel.id} channel={channel} />
          ))}
    </ul>
  );
};

export default ChannelList;
