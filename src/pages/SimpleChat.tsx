import ChannelList from 'components/ChannelList';
import { useJoinedChannels } from 'hooks';

const SimpleChat: React.FC = () => {
  const { isLoading: loadingChannels, resource: channels } =
    useJoinedChannels();

  return (
    <>
      <div className="sm:max-w-xs min-w-xs border-r min-h-screen">
        <ChannelList loading={loadingChannels} channels={channels} />
      </div>
    </>
  );
};

export default SimpleChat;
