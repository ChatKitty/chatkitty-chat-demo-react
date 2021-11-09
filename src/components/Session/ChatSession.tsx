import { Channel, Message } from 'chatkitty';
import { useChatSession } from 'hooks';
import { useEffect } from 'react';

interface ChannelDetailProps {
  channel: Channel;
  onMessageReceived: (message: Message) => void;
  children: React.ReactNode;
}

const ChatSession: React.FC<ChannelDetailProps> = ({
  channel,
  onMessageReceived,
  children,
}) => {
  const { makeRequest: startChatSession } = useChatSession();

  useEffect(() => {
    const session = startChatSession(channel, onMessageReceived);

    return session.end;
  }, [channel]);

  return <>{children}</>;
};

export default ChatSession;
