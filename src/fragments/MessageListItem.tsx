import { Message as ChatKittyMessage, isUserMessage} from 'chatkitty';
import { Emoji } from 'emoji-mart';
import moment from 'moment';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { ReactElement, useContext } from 'react';
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
import ReactionRenderer from './ReactionRenderer';


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

  const { messageReactor, messageUnReactor, currentUser } = useContext(ChatAppContext);
  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });


  const clickListener = () =>{
    let notIn= 1;
    if (message.reactions && currentUser){
      for (let i = 0; i< message.reactions[0].count; i++){
        if( currentUser.id === message.reactions[0].users[i].id){
          notIn = 0;
          messageUnReactor( 'smiley', message);
          break;
        }
      }
      
    }
    if(notIn){
      messageReactor( 'smiley', message);
    }
  };

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
            style={{position:'relative', left:'50px', cursor: 'pointer', borderRadius: '20%'}}
            onClick={clickListener}
            >
              <Emoji size={15} emoji={'smiley'}/>
            </StyledBox>}
        </FlexRow>

        <Message message={message}/>
        <ReactionRenderer reactions={message.reactions}/>
      </FlexColumn>
    </FlexRow>
  );
};

export default MessageListItem;
