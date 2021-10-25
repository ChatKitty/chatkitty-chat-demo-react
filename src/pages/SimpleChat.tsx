import ChannelList from 'components/ChannelList';
import { useJoinedChannels } from 'hooks';

const SimpleChat: React.FC = () => {
  const { isLoading: loadingChannels, resource: channels } =
    useJoinedChannels();

  return (
    <>
      <ChannelList loading={loadingChannels} channels={channels} />
    </>
  );
};

export default SimpleChat;
