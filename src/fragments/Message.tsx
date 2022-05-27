import { Message as ChatKittyMessage, isFileMessage, isTextMessage } from 'chatkitty';
import React from 'react';
import { TextMessage } from 'react-chat-ui-kit';

import LinkPreview from './LinkPreview';

type MessageProps = {
  message: ChatKittyMessage;
};

const Message: React.FC<MessageProps> = ({ message }: MessageProps) => {




  return ( 
    <>
      {isTextMessage(message) && 
        <>
          <TextMessage text={message.body} />
          {message.links && <LinkPreview links={message.links}/>}
        </>
      }
      {isFileMessage(message) && 
        <>
          <p>working on the file message {typeof(message)}</p>
        </>
      }
    </>
         
  );


};

export default Message;
