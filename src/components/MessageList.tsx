import { Message, TextUserMessage } from 'chatkitty';
import MessageListItem from 'components/MessageListItem';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ul className="flex flex-col bg-purple-50 shadow-inner">
      {messages.map((message) => (
        <MessageListItem
          key={message.id}
          message={message as TextUserMessage}
        />
      ))}
    </ul>
  );
};

export default MessageList;
