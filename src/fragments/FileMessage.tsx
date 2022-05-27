import { BaseFileMessage, FileUserMessage } from 'chatkitty';
import React, { useEffect } from 'react';

import FileIcon from '../assets/images/File_Icon.png';

interface FileMessageProp {
  message: BaseFileMessage | FileUserMessage;
}

const FileMessage: React.FC<FileMessageProp> = ({
  message,
}: FileMessageProp) => {
  useEffect(() => {
    console.log(message.file.url);
  }, []);
  
  return (
    <a href={message.file.url} download={message.file.name}>
      <div style={{ width: '100px', height: '100px' }}>
        {message.file.contentType === 'image/png' ? (
          <img
            src={message.file.url}
            style={{ maxWidth: '100%', borderRadius: '10%' }}
          />
        ) : (
          <img src={FileIcon} style={{ maxWidth: '50%' }} />
        )}
        <p style={{marginTop:'1px'}}>{message.file.name}</p>
      </div>
    </a> 
  );
};

export default FileMessage;
