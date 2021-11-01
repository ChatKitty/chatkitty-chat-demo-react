import { Message, TextUserMessage } from 'chatkitty';
import MessageListItem from 'components/MessageListItem';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <ul className="flex-1 flex flex-col-reverse bg-gray-100 shadow-inner overflow-y-scroll">
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
