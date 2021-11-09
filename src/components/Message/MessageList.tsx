import { Message, TextUserMessage } from 'chatkitty';
import MessageListItem from 'components/Message/MessageListItem';

interface MessageListProps {
  loading: boolean;
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ loading, messages }) => {
  return (
    <ul
      id="messageList"
      className="flex-1 flex flex-col-reverse bg-gray-100 shadow-inner overflow-y-scroll webkit-scroll"
    >
      {loading ? (
        <>LOADING...</>
      ) : (
        messages.map((message) => (
          <MessageListItem
            key={message.id}
            message={message as TextUserMessage}
          />
        ))
      )}
    </ul>
  );
};

export default MessageList;
