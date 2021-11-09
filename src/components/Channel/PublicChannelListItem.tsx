import { PublicChannel } from 'chatkitty';

interface PublicChannelListItemProps {
  channel: PublicChannel;
  selected?: boolean;
  handleClick: (channel: PublicChannel) => void;
  handleExtraActionClick?: (channel: PublicChannel) => void;
}

const PublicChannelListItem: React.FC<PublicChannelListItemProps> = ({
  channel,
  selected,
  handleClick,
  handleExtraActionClick,
}) => {
  return (
    <li className="flex flex-row group w-full">
      <div
        className={`cursor-pointer flex flex-1 items-center p-2 transition duration-200 ease-in-out transform hover:shadow-md ${
          selected ? 'bg-gray-100' : 'group-hover:bg-gray-200'
        }`}
        onClick={() => handleClick(channel)}
      >
        <div
          className={`flex flex-col rounded-md w-6 h-6 ${
            selected
              ? 'bg-gray-800 text-white'
              : 'bg-purple-400 group-hover:bg-gray-700 text-white'
          } justify-center items-center mr-4 group-hover:text-white`}
        >
          #
        </div>
        <div className="flex-1 pl-1 mr-16 text-left">
          <div className="">{channel.name}</div>
          <p className="text-xs font-light">
            {(channel.properties as { description: string }).description}
          </p>
        </div>
        {handleExtraActionClick && (
          <button
            className="has-tooltip"
            onClick={(evt) => {
              handleExtraActionClick(channel);
              evt.stopPropagation();
            }}
          >
            <span className="tooltip rounded -ml-12 text-xs font-light">
              Leave
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 opacity-20 hover:opacity-100"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};

export default PublicChannelListItem;
