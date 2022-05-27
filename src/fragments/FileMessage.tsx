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
    console.log(message.file.contentType);
  }, []);

  return (
    <>
      <div style={{width: '50px', height: '50px'}}>
        {message.file.contentType === 'image/png' ? (<img src={message.file.url} style={{maxWidth:'100%', borderRadius:'10%'}}/>) : (<img src={FileIcon} style={{maxWidth:'100%'}} />)}
      </div>  
      <p>Working on the file message to display: {message.file.name}</p>
    </>
  );
};

export default FileMessage;
