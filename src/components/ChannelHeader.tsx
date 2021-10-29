import { Channel } from 'chatkitty';

interface ChannelHeaderProps {
  channel: Channel;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channel }) => {
  return (
    <div className="py-2 pl-4 border-b border-gray-100 w-full shadow-sm">
      <h1 className="text-xl text-gray-800">#{channel.name}</h1>
      <p className="font-light text-sm">
        {(channel.properties as any).description}
      </p>
    </div>
  );
};

export default ChannelHeader;
