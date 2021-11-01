import { Channel, Message } from 'chatkitty';
import ChannelHeader from 'components/ChannelHeader';
import MessageInput from 'components/MessageInput';
import MessageList from 'components/MessageList';
import { useChatSession } from 'hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';

interface ChannelDetailProps {
  channel: Channel;
  messagesLoading: boolean;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  sendMessage: (channel: Channel, draft: string) => void;
  updateMessage: (channel: Channel, draft: string) => void;
}

const ChannelDetail: React.FC<ChannelDetailProps> = ({
  channel,
  messagesLoading,
  messages,
  setMessages,
  sendMessage,
  updateMessage,
}) => {
  const { makeRequest: startChatSession } = useChatSession();

  useEffect(() => {
    const session = startChatSession(channel, (message: Message) => {
      setMessages((prev) => [message, ...prev]);
    });

    return session.end;
  }, [channel]);

  return (
    <>
      <ChannelHeader channel={channel} />
      {messagesLoading ? (
        'Loading Messages...'
      ) : (
        <>
          <MessageList messages={messages} />
          <MessageInput
            channel={channel}
            sendMessage={sendMessage}
            updateMessage={updateMessage}
          />
        </>
      )}
    </>
  );
};

export default ChannelDetail;
