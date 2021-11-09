import { Channel, CurrentUser, DirectChannel } from 'chatkitty';
import DirectChannelListHeading from 'components/Channel/DirectChannelListHeading';
import DirectChannelListItem from 'components/Channel/DirectChannelListItem';
import { Modal } from 'types';

interface DirectChannelListProps {
  currentUser: CurrentUser;
  channels: DirectChannel[];
  selectedChannel?: Channel;
  handleChannelClick: (channel: DirectChannel) => void;
  handleExtraActionClick: (channel: DirectChannel) => void;
  setModal: (modal?: Modal) => void;
}

const DirectChannelList: React.FC<DirectChannelListProps> = ({
  currentUser,
  channels,
  selectedChannel,
  handleChannelClick,
  handleExtraActionClick,
  setModal,
}) => (
  <>
    <DirectChannelListHeading setModal={setModal} />
    {channels.length > 0 &&
      channels.map((channel) => (
        <DirectChannelListItem
          key={channel.id}
          currentUser={currentUser}
          channel={channel}
          selected={channel.id === selectedChannel?.id}
          handleClick={handleChannelClick}
          handleExtraActionClick={handleExtraActionClick}
        />
      ))}
  </>
);

export default DirectChannelList;
