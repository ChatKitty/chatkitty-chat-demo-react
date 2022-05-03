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

const Chat: React.FC = () => {
  const { channel, startChatSession, prependToMessages, currentUser } =
    useContext(ChatAppContext);
  const [typingUsers, setTypingUsers] = useState<User | null>(null);
  const [typingUser, setTypingUser] = useState<User | null>(null);
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
          setTypingUser(user);
        }
      },
      (user: User) => {
        if (currentUser?.id !== user.id) {
          setTypingUser(null);
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
      {typingUser && (
        <StyledBox style={{ display: 'grid', gridTemplateColumns: '1fr 60fr' }}>
          {typingUsers.map((user) => (
            <img
              key={user?.id}
              src={user.displayPictureUrl}
              style={{ borderRadius: '50%', width: '20px' }}
            />
          ))}
          <p> is typing</p>
        </StyledBox>
      )}
      <ChatMessageInput />
    </FlexColumn>
  ) : (
    <StyledBox margin="auto">
      <Heading size={HeadingSizes.BIG}>Select channel</Heading>
    </StyledBox>
  );
}; //

export default Chat;
