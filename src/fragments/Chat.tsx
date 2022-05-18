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
  const { channel, messages, startChatSession, prependToMessages, currentUser} =
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
      {messages.length !== 0 ? 
        (<TypingIndicator typingUsers={typingUsers} />):
        (<StyledBox style={{position: 'relative', marginLeft:'auto', marginRight:'auto', marginBottom:'50%'}}>
            <Heading size={HeadingSizes.BIG}>Loading Messages</Heading>
        </StyledBox>)
      }
      <ChatMessageInput />
    </FlexColumn>
  ) : (
    <StyledBox margin="auto">
      <Heading size={HeadingSizes.BIG}>Select channel</Heading>
    </StyledBox>
  );
}; //

export default Chat;
