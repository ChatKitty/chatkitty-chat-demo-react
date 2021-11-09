import { PublicChannel } from 'chatkitty';

interface PublicChannelHeaderProps {
  channel: PublicChannel;
  onPrevious: () => void;
}

const PublicChannelHeader: React.FC<PublicChannelHeaderProps> = ({
  channel,
  onPrevious,
}) => (
  <div className="flex items-center py-2 px-4 w-full shadow-sm border-l text-right sm:text-left">
    <button className="inline-block sm:hidden p-3" onClick={onPrevious}>
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
          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
        />
      </svg>
    </button>
    <div className="flex-1">
      <h1 className="text-sm text-black font-bold">#{channel.name}</h1>
      <p className="text-xs text-gray-700">
        {(channel.properties as { description: string }).description}
      </p>
    </div>
  </div>
);

export default PublicChannelHeader;
