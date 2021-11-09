import { getParticipantList } from 'util/UserUtil';

import { CurrentUser, DirectChannel } from 'chatkitty';

interface DirectChannelListItemProps {
  currentUser: CurrentUser;
  channel: DirectChannel;
  selected?: boolean;
  handleClick: (channel: DirectChannel) => void;
  handleExtraActionClick?: (channel: DirectChannel) => void;
}

const DirectChannelListItem: React.FC<DirectChannelListItemProps> = ({
  currentUser,
  channel,
  selected,
  handleClick,
  handleExtraActionClick,
}) => (
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
            : 'bg-blue-500 group-hover:bg-gray-700 text-white'
        } justify-center items-center mr-4 group-hover:text-white`}
      >
        @
      </div>
      <div className="flex-1 pl-1 mr-16 text-left">
        <div className="">{getParticipantList(channel, currentUser)}</div>
      </div>
      {handleExtraActionClick && (
        <button
          onClick={(evt) => {
            handleExtraActionClick(channel);
            evt.stopPropagation();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 opacity-20 hover:opacity-100"
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
      )}
    </div>
  </li>
);

export default DirectChannelListItem;
