import { Message as ChatKittyMessage, isFileMessage, isTextMessage, isUserMessage } from 'chatkitty';
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
  const {changeReply, getMessageParent, messages} = useContext(ChatAppContext);
  const [messageParent, setMessageParent] = useState<ChatKittyMessage | null>(null);
  const [previousMessage, setPreviousMessage] = useState<ChatKittyMessage|null>(null);


  useEffect(() => {
    getMessageParent(message).then((message) => {
      setMessageParent(message)
    });

    if(index){
      setPreviousMessage(messages[index-1]);
    }
    
  },[])


  const changeReplyMessage = () => {
    changeReply(message);
  }
  
  const scrollToElement = () => {
    const element = document.getElementById(String(messageParent?.id))
    
    if(element){
      element.scrollIntoView(false);
    }
  }
  


  return (<>
    {messageParent && isUserMessage(messageParent) &&
      <FlexRow 
        style={{marginLeft:'20px', cursor:'pointer'}}
        alignItems="flex-start"
        bg={isHovering ? 'backgrounds.contentHover' : ''}
        {...hoverProps}
        onClick={scrollToElement}
      >
        <strong>@{messageParent.user.displayName}</strong>
        {isTextMessage(messageParent) && <p>: {messageParent.body}</p>}
        {isFileMessage(messageParent) && <p>: {messageParent.file.name}</p>}
      </FlexRow>
    }
    <FlexRow
      py="1"
      px={[5, 6]}
      alignItems="flex-start"
      bg={isHovering ? 'backgrounds.contentHover' : ''}
      {...hoverProps}
    >
      {(avatar)}
      <FlexColumn marginLeft="5" flexGrow={1}>
        <FlexRow marginBottom="1">
          <StyledBox marginRight="3">
            <Heading>{sender.displayName}</Heading>
          </StyledBox>
          <Label size={LabelSizes.SMALL}>
            {moment(message.createdTime).fromNow()}
          </Label>
          {isHovering && (
            <FlexRow>
              <StyledBox
                style={{
                  position: 'relative',
                  left: '100px',
                  borderRadius: '20%',
                  marginLeft:'5px',
                  height: '17px',
                  width: '15px',
                }}
              >
                <PopupEmojiWindow message={message} />
                
              </StyledBox>
              <div style={{
                  position: 'relative',
                  left: '100px',
                  borderRadius: '20%',
                  marginLeft:'5px',
                  height: '17px',
                  width: '15px',
                }}>
                  <img src={replyIcon} style={{width:'20px', cursor:'pointer'}} onClick={changeReplyMessage}/> 
                </div>
            </FlexRow>
          )}
        </FlexRow>

        <Message message={message} />
        <Reactions message={message} />
      </FlexColumn>
    </FlexRow>
    </> 
  );
};

export default MessageListItem;
