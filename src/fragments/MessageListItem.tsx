import {
  Message as ChatKittyMessage,
  isFileMessage,
  isTextMessage,
  isUserMessage,
} from 'chatkitty';
import moment from 'moment';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import {
  FlexColumn,
  FlexRow,
  Heading,
  Label,
  LabelSizes,
  StyledBox,
} from 'react-chat-ui-kit';
import { useHover } from 'react-chat-ui-kit';

import replyIcon from '../assets/images/reply-icon.png';

import Message from './Message';
import PopupEmojiWindow from './PopupEmojiWindow';
import Reactions from './Reactions';

interface MessageListItemProps {
  message: ChatKittyMessage;
  avatar: ReactElement;
  index?: number;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  avatar,
  index,
}: MessageListItemProps) => {
  const sender: { displayName: string } = isUserMessage(message)
    ? message.user
    : {
        displayName: 'ChatKitty',
      };

  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const { changeReply, getMessageParent, messages } =
    useContext(ChatAppContext);
  const [messageParent, setMessageParent] = useState<ChatKittyMessage | null>(
    null
  );

  const [sameUser, setSameUser] = useState<boolean | null>(true);

  useEffect(() => {
    getMessageParent(message).then((message) => {
      setMessageParent(message);
    });

    if (index !== undefined && index < messages.length - 1) {
      const previousMessage = messages[index + 1];
      const messageTime = message.createdTime
        .split('T')
        .join('-')
        .split('-')
        .join(':')
        .split(':');
      const previousMessageTime = previousMessage.createdTime
        .split('T')
        .join('-')
        .split('-')
        .join(':')
        .split(':');
      let sameTime = true;

      for (let i = 0; i < 5; i++) {
        if (messageTime[i] !== previousMessageTime[i]) {
          console.log(message.id);
          sameTime = false;
          break;
        }
      }

      setSameUser(
        isUserMessage(previousMessage) &&
          previousMessage.user.displayName === sender.displayName &&
          sameTime
      );
    }
  }, []);

  const changeReplyMessage = () => {
    changeReply(message);
  };

  const scrollToElement = () => {
    const element = document.getElementById(String(messageParent?.id));

    if (element) {
      element.scrollIntoView(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {messageParent && isUserMessage(messageParent) && (
        <FlexRow
          style={{ marginLeft: '20px', cursor: 'pointer' }}
          alignItems="flex-start"
          bg={isHovering ? 'backgrounds.contentHover' : ''}
          {...hoverProps}
          onClick={scrollToElement}
        >
          <strong>@{messageParent.user.displayName}</strong>
          {isTextMessage(messageParent) && <p>: {messageParent.body}</p>}
          {isFileMessage(messageParent) && <p>: {messageParent.file.name}</p>}
        </FlexRow>
      )}
      <FlexRow
        py="1"
        px={[5, 6]}
        alignItems="flex-start"
        bg={isHovering ? 'backgrounds.contentHover' : ''}
        {...hoverProps}
      >
        {(!sameUser || messageParent) && avatar}
        <FlexColumn marginLeft="5" flexGrow={1}>
          <FlexRow marginBottom="1">
            {(!sameUser || messageParent) && (
              <StyledBox marginRight="3">
                <Heading>{sender.displayName}</Heading>
              </StyledBox>
            )}
            {(!sameUser || messageParent) && (
              <Label size={LabelSizes.SMALL}>
                {moment(message.createdTime).fromNow()}
              </Label>
            )}
          </FlexRow>

          <FlexRow>
            <div
              style={{
                position: 'relative',
                left: sameUser && !messageParent ? '30px' : '0px',
              }}
            >
              <Message message={message} />
            </div>
            {isHovering && (
              <FlexRow
                style={{ position: 'absolute', top: '10px', right: '50px' }}
              >
                <PopupEmojiWindow message={message} />
                <div
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '30px',
                    borderRadius: '20%',
                    height: '17px',
                    width: '15px',
                  }}
                >
                  <img
                    src={replyIcon}
                    style={{ width: '20px', cursor: 'pointer' }}
                    onClick={changeReplyMessage}
                  />
                </div>
              </FlexRow>
            )}
          </FlexRow>

          <div
            style={{
              position: 'relative',
              marginLeft: sameUser && !messageParent ? '30px' : '0px',
            }}
          >
            <Reactions message={message} />
          </div>
        </FlexColumn>
      </FlexRow>
    </div>
  );
};

export default MessageListItem;
