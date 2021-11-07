import { User } from 'chatkitty';

interface UserListItemProps {
  user: User;
  handleClick: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, handleClick }) => {
  return (
    <li className="flex flex-row group w-full">
      <div
        className={`cursor-pointer flex flex-1 items-center p-2 transition duration-200 ease-in-out transform hover:shadow-md group-hover:bg-gray-200`}
        onClick={() => handleClick(user)}
      >
        <div
          className={`flex flex-col rounded-md w-6 h-6
            bg-blue-300 group-hover:bg-gray-700
            justify-center items-center mr-4 group-hover:text-white`}
        >
          @
        </div>
        <div className="flex-1 pl-1 mr-16 text-left">
          <div className="">{user.displayName}</div>
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
