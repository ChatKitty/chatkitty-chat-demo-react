import { User } from 'chatkitty';

interface MessageTypingIndicatorProps {
  usersTyping: User[];
}

const MessageTypingIndicator: React.FC<MessageTypingIndicatorProps> = ({
  usersTyping,
}) => (
  <li className="flex flex-row group opacity-50">
    <div className="col-start-1 col-end-8 px-6 py-3">
      <div className="flex flex-row items-center">
        {usersTyping.map((user, index) => (
          <div key={user.id} className="animate-pulse flex flex-row">
            <div
              className={`h-10 w-10 min-w-10 rounded-full overflow-hidden transform -translate-x-${
                8 * index
              }`}
            >
              <img src={user.displayPictureUrl} />
            </div>
            {index === usersTyping.length - 1 && (
              <div
                className={`ml-3 text-sm py-2 px-4 shadow rounded-xl rounded-tl-none bg-white whitespace-pre-wrap transform -translate-x-${
                  8 * index
                }`}
              >
                <div>typing...</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </li>
);

export default MessageTypingIndicator;
