import { CurrentUser } from 'chatkitty';

interface CurrentUserDisplayProps {
  user: CurrentUser;
}

const CurrentUserDisplay: React.FC<CurrentUserDisplayProps> = ({ user }) => {
  return (
    <div className="flex flex-row items-center pl-3">
      <div className="h-10 w-10 rounded-full overflow-hidden">
        <img src={user.displayPictureUrl} />
      </div>
      <div className="py-2 flex flex-col pl-4 border-gray-100 border-b">
        <h1 className="text-lg font-semibold text-gray-800">
          {user.displayName}
        </h1>
        <p className="text-sm font-light">Guest</p>
      </div>
    </div>
  );
};

export default CurrentUserDisplay;
