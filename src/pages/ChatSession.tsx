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
  setSidePanelOpen: () => void;
}

const ChatSession: React.FC<ChannelDetailProps> = ({
  channel,
  messagesLoading,
  messages,
  setMessages,
  sendMessage,
  updateMessage,
  setSidePanelOpen,
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
      <ChannelHeader channel={channel} onPrevious={setSidePanelOpen} />
      <MessageList loading={messagesLoading} messages={messages} />
      <MessageInput
        channel={channel}
        sendMessage={sendMessage}
        updateMessage={updateMessage}
      />
    </>
  );
};

export default ChatSession;
