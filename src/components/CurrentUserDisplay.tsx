import { CurrentUser } from 'chatkitty';

interface CurrentUserDisplayProps {
  user: CurrentUser;
}

const CurrentUserDisplay: React.FC<CurrentUserDisplayProps> = ({ user }) => {
  return (
    <div className="py-2 flex flex-col pl-4 border-gray-100 border-b">
      <h1 className="text-xl font-semibold text-gray-800 text-right pr-4">
        {user.displayName}
      </h1>
    </div>
  );
};

export default CurrentUserDisplay;
