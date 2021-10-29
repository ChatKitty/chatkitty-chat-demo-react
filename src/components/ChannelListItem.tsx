import { Channel } from 'chatkitty';

interface ChannelListItemProps {
  channel: Channel;
  selected: boolean;
  setSelectedChannel: React.Dispatch<React.SetStateAction<Channel>>;
}

const ChannelListItem: React.FC<ChannelListItemProps> = ({
  channel,
  selected,
  setSelectedChannel,
}) => {
  return (
    <li className="flex flex-row mx-1 group">
      <button
        className={`cursor-pointer rounded-md flex flex-1 items-center p-2 transition duration-200 ease-in-out transform hover:shadow-md ${
          selected ? 'bg-purple-300' : 'group-hover:bg-gray-200'
        }`}
        onClick={() => setSelectedChannel(channel)}
      >
        <div
          className={`flex flex-col rounded-md w-8 h-8 ${
            selected
              ? 'bg-gray-800 text-white'
              : 'bg-purple-400 group-hover:bg-gray-700'
          } justify-center items-center mr-4 group-hover:text-white`}
        >
          #
        </div>
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium">{channel.name}</div>
        </div>
        <div className="has-tooltip">
          <span className="tooltip rounded -ml-12 mt-0.5 text-xs font-light">
            Leave
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </li>
  );
};

export default ChannelListItem;
