import { BaseFileMessage, FileUserMessage } from 'chatkitty';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useEffect, useState } from 'react';

import FileIcon from '../assets/images/File_Icon.png';

interface FileMessageProp {
  message: BaseFileMessage | FileUserMessage;
}

const FileMessage: React.FC<FileMessageProp> = ({
  message,
}: FileMessageProp) => {

  const{getURLFile} = useContext(ChatAppContext);
  
  const [link, setLink] = useState<string>('');

  useEffect(() => {
    const blobPromise = getURLFile(message.file.url)
  
    if(blobPromise){
      blobPromise.then( 
        (blob) =>{ 
        setLink( URL.createObjectURL(blob) );} 
      )
  }
  }, [message]);

  


  return (
    <a href={link} download={message.file.name}>
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
