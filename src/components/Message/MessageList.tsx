import { Message, TextUserMessage, User } from 'chatkitty';
import MessageListItem from 'components/Message/MessageListItem';
import MessageTypingIndicator from 'components/Message/MessageTypingIndicator';
import Spinner from 'components/Utility/Spinner';

interface MessageListProps {
  loading: boolean;
  messages: Message[];
  usersTyping: User[];
}

const MessageList: React.FC<MessageListProps> = ({
  loading,
  messages,
  usersTyping,
}) => (
  <ul
    id="messageList"
    className="flex-1 flex flex-col-reverse bg-gray-100 shadow-inner overflow-y-auto webkit-scroll"
  >
    {loading ? (
      <Spinner />
    ) : (
      <>
        <MessageTypingIndicator usersTyping={usersTyping} />
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageListItem
              key={message.id}
              message={message as TextUserMessage}
            />
          ))
        ) : (
          <p className="font-light italic p-4 text-gray-400">
            There is nothing here yet! Start by sending a message.
          </p>
        )}
      </>
    )}
  </ul>
);

export default MessageList;
