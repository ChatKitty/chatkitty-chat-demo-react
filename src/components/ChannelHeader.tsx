import { Channel } from 'chatkitty';

interface ChannelHeaderProps {
  channel: Channel;
}

const ChannelHeader: React.FC<ChannelHeaderProps> = ({ channel }) => {
  return (
    <div className="relative py-2 pl-4 w-full shadow-sm border-l">
      <h1 className="text-sm text-black font-bold">#{channel.name}</h1>
      <p className="text-xs text-gray-700">
        {(channel.properties as { description: string }).description}
      </p>
    </div>
  );
};

export default ChannelHeader;
