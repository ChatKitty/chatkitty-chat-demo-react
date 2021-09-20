import { Channel, isUserMessage } from 'chatkitty';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from 'styled-components';

import { ChatAppContext } from '../providers/ChatAppProvider';
import { FlexColumn, ScrollView } from '../ui-kit/components';
import { Avatar, AvatarVariants } from '../ui-kit/components/chat';
import { usePaginator } from '../ui-kit/hooks';
import { getUniqueColor } from '../ui-kit/utilities';

import MessageListItem from './MessageListItem';
import WelcomeMessage from './WelcomeMessage';

interface ChatMessagesProps {
  channel: Channel;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({
  channel,
}: ChatMessagesProps) => {
  const theme = useContext(ThemeContext);

  const { messages, messagesPaginator, appendToMessages } =
    useContext(ChatAppContext);

  const [height, setHeight] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  const { containerRef, boundaryRef } = usePaginator({
    paginator: () => {
      if (!channel) {
        return;
      }

      return messagesPaginator(channel);
    },
    onPageFetched: (items) => {
      appendToMessages(items);
    },
    dependencies: [channel],
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollPosition = event.currentTarget?.scrollTop;

    if (scrollPosition) {
      setScrollPosition(scrollPosition);
    }
  };

  const restoreScrollPosition = () => {
    if (containerRef.current) {
      if (scrollPosition) {
        containerRef.current.scrollTo(0, scrollPosition);
      } else {
        // scroll to bottom
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
      }
    }
  };

  const current = containerRef.current;

  // when history is pulled, scroll down to compensate
  const newHeight = current?.scrollHeight;
  useEffect(() => {
    if (height === 0 && newHeight) {
      setHeight(newHeight);
    } else if (newHeight && newHeight !== height) {
      if (current) {
        current.scrollTop += newHeight - height;
      }
      setHeight(newHeight);
    }
  }, [newHeight, height, current]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const hasReachedBottom = current
    ? current.scrollHeight - current.clientHeight === current.scrollTop
    : false;

  useEffect(() => {
    if (hasReachedBottom) {
      scrollToBottom();
    }
  }, [messages.length, hasReachedBottom, scrollToBottom]);

  useEffect(() => {
    restoreScrollPosition();
  }, []);

  return (
    <ScrollView ref={containerRef} onScroll={handleScroll}>
      <FlexColumn
        minHeight="100%"
        flexGrow={1}
        paddingBottom="1"
        flexDirection="column-reverse"
      >
        <div ref={messagesEndRef} />
        {messages.map((message) => (
          <MessageListItem
            message={message}
            key={message.id}
            avatar={
              isUserMessage(message) ? (
                <Avatar
                  variant={AvatarVariants.ROUND}
                  bg={getUniqueColor(
                    message.user.displayName,
                    theme.colors.avatars
                  )}
                >
                  {message.user.displayName[0]}
                </Avatar>
              ) : (
                <Avatar
                  variant={AvatarVariants.ROUND}
                  bg={getUniqueColor('system', theme.colors.avatars)}
                >
                  C
                </Avatar>
              )
            }
          />
        ))}
        <WelcomeMessage />
        <div ref={boundaryRef} />
        {/* This moves the list of messages to the bottom, since there's a bug with flex-end scroll */}
        <FlexColumn flex="1 1 auto"></FlexColumn>
      </FlexColumn>
    </ScrollView>
  );
};

export default ChatMessages;
