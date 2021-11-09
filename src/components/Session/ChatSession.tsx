import { Channel, CurrentUser, isDirectChannel, Message } from 'chatkitty';
import DirectChannelHeader from 'components/Channel/DirectChannelHeader';
import PublicChannelHeader from 'components/Channel/PublicChannelHeader';
import MessageInput from 'components/Message/MessageInput';
import MessageList from 'components/Message/MessageList';
import { useChatSession } from 'hooks';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { animateScroll as scroll } from 'react-scroll';

interface ChannelDetailProps {
  currentUser: CurrentUser;
  channel: Channel;
  messagesLoading: boolean;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
  sendMessage: (channel: Channel, draft: string) => void;
  updateMessage: (channel: Channel, draft: string) => void;
  setSidePanelOpen: () => void;
}

const ChatSession: React.FC<ChannelDetailProps> = ({
  currentUser,
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

  const renderHeader = (channel: Channel) => {
    if (isDirectChannel(channel)) {
      return (
        <DirectChannelHeader
          currentUser={currentUser}
          channel={channel}
          onPrevious={setSidePanelOpen}
        />
      );
    }
    return (
      <PublicChannelHeader channel={channel} onPrevious={setSidePanelOpen} />
    );
  };

  return (
    <>
      {renderHeader(channel)}
      <MessageList loading={messagesLoading} messages={messages} />
      <MessageInput
        channel={channel}
        sendMessage={(...args) => {
          sendMessage(...args);
          scroll.scrollToBottom({
            containerId: 'messageList',
          });
        }}
        updateMessage={updateMessage}
      />
    </>
  );
};

export default ChatSession;
