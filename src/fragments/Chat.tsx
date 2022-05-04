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
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const [numUserTyping, setNumTyping] = useState(0);
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
          setTypingUsers((typingUsers) => [...typingUsers, user]);
          if (numUserTyping < 5) {
            setNumTyping(numUserTyping + 1);
          }
        }
      },
      (user: User) => {
        if (currentUser?.id !== user.id) {
          setTypingUser(null);
          setTypingUsers(
            typingUsers.splice(
              typingUsers.findIndex((item) => item.id === user.id),
              1
            )
          );
          if (numUserTyping > 1) {
            setNumTyping(numUserTyping - 1);
          }
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
        <FlexColumn>
          {numUserTyping < 6 &&
            typingUsers.map((user) => (
              <img
                key={user.id}
                src={user.displayPictureUrl}
                style={{ borderRadius: '50%', width: '20px' }}
              />
            ))}
          {numUserTyping > 1 && (
            <p> and {numUserTyping - 1} others are typing</p>
          )}
          {numUserTyping === 1 && <p> is typing</p>}
        </FlexColumn>
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
