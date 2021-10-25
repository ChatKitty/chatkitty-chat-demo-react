import { Channel } from 'chatkitty';

interface ChannelListProps {
  loading: boolean;
  channels: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ loading, channels }) => {
  return (
    <>
      {loading
        ? 'Loading ChannelList...'
        : channels &&
          channels.map((channel) => <div key={channel.id}>{channel.name}</div>)}
    </>
  );
};

export default ChannelList;
