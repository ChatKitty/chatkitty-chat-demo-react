import { CurrentUser } from 'chatkitty';

interface CurrentUserDisplayProps {
  loading: boolean;
  user: CurrentUser | undefined;
  onClose: () => void;
}

const CurrentUserDisplay: React.FC<CurrentUserDisplayProps> = ({
  loading,
  user,
  onClose,
}) => {
  if (loading) {
    return <>LOADING...</>;
  }

  if (user) {
    return (
      <div className="flex flex-row items-center pl-3">
        <div className="h-10 w-10 rounded-full overflow-hidden opacity-80">
          <img src={user.displayPictureUrl} />
        </div>
        <div className="py-2 flex-1 flex flex-col pl-4 border-gray-100 border-b">
          <div className="flex items-center">
            <h1 className="text-lg font-semibold text-gray-800">
              {user.displayName}
            </h1>
            <span
              className={`${
                user.presence.online ? 'bg-green-500' : 'bg-gray-300'
              } rounded-full w-2 h-2 ml-2`}
            ></span>
          </div>
          <p className="text-sm font-light">Guest</p>
        </div>
        <button className="inline-block sm:hidden p-3" onClick={onClose}>
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
      </div>
    );
  }

  return null;
};

export default CurrentUserDisplay;
