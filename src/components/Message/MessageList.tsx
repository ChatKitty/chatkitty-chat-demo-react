import { Message, TextUserMessage } from 'chatkitty';
import MessageListItem from 'components/Message/MessageListItem';
import Spinner from 'components/Utility/Spinner';

interface MessageListProps {
  loading: boolean;
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ loading, messages }) => (
  <ul
    id="messageList"
    className="flex-1 flex flex-col-reverse bg-gray-100 shadow-inner overflow-y-auto webkit-scroll"
  >
    {loading ? (
      <Spinner />
    ) : messages.length > 0 ? (
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
  </ul>
);

export default MessageList;
