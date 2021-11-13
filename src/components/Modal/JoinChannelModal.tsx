import { Channel } from 'chatkitty';
import PublicChannelListItem from 'components/Channel/PublicChannelListItem';
import Spinner from 'components/Utility/Spinner';
import { useJoinableChannels } from 'hooks';

interface JoinChannelModalProps {
  closeModal: () => void;
  joinChannel: (channel: Channel) => void;
}

const JoinChannelModal: React.FC<JoinChannelModalProps> = ({
  closeModal,
  joinChannel,
}) => {
  const { isLoading: channelsLoading, resource: channels } =
    useJoinableChannels();

  return (
    <div className="bg-white rounded-lg w-11/12 sm:w-8/12 md:w-1/2 max-w-md z-20">
      <div className="flex flex-col items-start p-4">
        <button className="flex flex-row w-full pb-2" onClick={closeModal}>
          <h1 className="flex-1 text-gray-800 font-medium text-xl text-left">
            Join a Channel
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {channelsLoading ? (
          <Spinner size={16} />
        ) : channels.length > 0 ? (
          channels.map((channel) => (
            <PublicChannelListItem
              key={channel.id}
              channel={channel}
              handleClick={async (channel) => {
                await joinChannel(channel);
                closeModal();
              }}
            />
          ))
        ) : (
          <p className="font-light">No available channels to join.</p>
        )}
      </div>
    </div>
  );
};

export default JoinChannelModal;
