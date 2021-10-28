import { CurrentUser } from 'chatkitty';

interface CurrentUserDisplayProps {
  loading: boolean;
  user: CurrentUser | undefined;
}

const CurrentUserDisplay: React.FC<CurrentUserDisplayProps> = ({
  loading,
  user,
}) => {
  return (
    <>
      {loading
        ? 'Loading User...'
        : user && (
            <div className="py-2 flex flex-col pl-4 border-b">
              <h1 className="text-xl font-semibold text-gray-800 text-right pr-4">
                {user.displayName}
              </h1>
            </div>
          )}
    </>
  );
};

export default CurrentUserDisplay;
