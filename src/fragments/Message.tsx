import { Message as ChatKittyMessage, isTextMessage } from 'chatkitty';
import invariant from 'invariant';
import React from 'react';
import { TextMessage } from 'react-chat-ui-kit';

import LinkPreview from './LinkPreview';

type MessageProps = {
  message: ChatKittyMessage;
};

const Message: React.FC<MessageProps> = ({ message }: MessageProps) => {
  if (isTextMessage(message)) {
    return (<div>
            <TextMessage text={message.body} />
            {message.links !== undefined && <LinkPreview links={message.links}/>}
          </div>);
  }

  return invariant(
    false,
    `No component available for displaying message of type "${message.type}"`
  );
};

export default Message;
