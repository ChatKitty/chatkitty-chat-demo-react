import { Message, User } from 'chatkitty';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlexColumn,
  Heading,
  HeadingSizes,
  StyledBox,
} from 'react-chat-ui-kit';

import { ChatAppContext } from '../providers/ChatAppProvider';

import ChatHeader from './ChatHeader';
import ChatMessageInput from './ChatMessageInput';
import ChatMessages from './ChatMessages';
import TypingIndicator from './TypingIndicator';

const Chat: React.FC = () => {
  const { channel, startChatSession, prependToMessages, currentUser, updateMessages} =
    useContext(ChatAppContext);

  const [typingUsers, setTypingUsers] = useState<User[]>([]);


  useEffect(() => {
    if (!channel) {
      return;
    }
    const session = startChatSession(
      channel,
      (message: Message) => {
        prependToMessages([message]);
      },
      (user: User) => {
        if (currentUser?.id !== user.id) {
          setTypingUsers((typingUsers) => [...typingUsers, user]);
        }
      },
      (user: User) => {
        if (currentUser?.id !== user.id) {
          setTypingUsers(
            typingUsers.splice(
              typingUsers.findIndex((item) => item.id === user.id),
              1
            )
          );
        }
      },
      (message: Message) => {
        updateMessages(message);
      },
      (message: Message) => {
        updateMessages(message);
      }
    );

    if (!session) {
      return;
    }

    return session.end;
  }, [channel]);

  return channel ? (
    <FlexColumn
      height="100%"
      width="100%"
      position={['fixed', 'static']}
      bg="backgrounds.content"
      borderRight="light"
    >
      <ChatHeader channel={channel} />
      <ChatMessages channel={channel} />
      <TypingIndicator typingUsers={typingUsers} />
      <ChatMessageInput />
    </FlexColumn>
  ) : (
    <StyledBox margin="auto">
      <Heading size={HeadingSizes.BIG}>Select channel</Heading>
    </StyledBox>
  );
}; //

export default Chat;
