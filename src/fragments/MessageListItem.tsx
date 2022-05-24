import { Message as ChatKittyMessage, isUserMessage} from 'chatkitty';
import moment from 'moment';
import React, { ReactElement } from 'react';
import {
  FlexColumn,
  FlexRow,
  Heading,
  Label,
  LabelSizes,
  StyledBox,
} from 'react-chat-ui-kit';
import { useHover } from 'react-chat-ui-kit';

import Message from './Message';
import PopupEmojiWindow from './PopupEmojiWindow';
import Reactions from './Reactions';


interface MessageListItemProps {
  message: ChatKittyMessage;
  avatar: ReactElement;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  message,
  avatar,
}: MessageListItemProps) => {
  const sender: { displayName: string } = isUserMessage(message)
    ? message.user
    : {
        displayName: 'ChatKitty',
      };

  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });

  return (
    <FlexRow
      py="1"
      px={[5, 6]}
      alignItems="flex-start"
      bg={isHovering ? 'backgrounds.contentHover' : ''}
      {...hoverProps}
    >
      {avatar}
      <FlexColumn marginLeft="5" flexGrow={1} >
        <FlexRow marginBottom="1">
          <StyledBox marginRight="3">
            <Heading>{sender.displayName}</Heading>
          </StyledBox>
          <Label size={LabelSizes.SMALL}>
            {moment(message.createdTime).fromNow()}
          </Label>
          {isHovering && 
            <StyledBox 
            style={{position:'relative', left:'50px', borderRadius: '20%', display:'inline-block', height:'17px', width:'15px'}}
            >
              <PopupEmojiWindow message={message}/>
            </StyledBox>}
        </FlexRow>

        <Message message={message}/>
        <Reactions message={message}/>
      </FlexColumn>
    </FlexRow>
  );
};

export default MessageListItem;
