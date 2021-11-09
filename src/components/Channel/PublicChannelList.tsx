import { Channel, PublicChannel } from 'chatkitty';
import PublicChannelListHeading from 'components/Channel/PublicChannelListHeading';
import PublicChannelListItem from 'components/Channel/PublicChannelListItem';
import { Modal } from 'types';

interface ChannelListProps {
  channels: PublicChannel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: PublicChannel) => void;
  handleExtraActionClick: (channel: PublicChannel) => void;
  setModal: (modal?: Modal) => void;
}

const PublicChannelList: React.FC<ChannelListProps> = ({
  channels,
  selectedChannel,
  handleChannelClick,
  handleExtraActionClick,
  setModal,
}) => (
  <>
    <PublicChannelListHeading setModal={setModal} />
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

export default PublicChannelList;
