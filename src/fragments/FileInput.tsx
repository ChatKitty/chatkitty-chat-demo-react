import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext } from 'react';
import { Dropdown, Icons } from 'react-chat-ui-kit';

interface FileInputProps {
  file?: File;
}

const FileInput: React.FC<FileInputProps> = () => {

  const {sendFileMessage} = useContext(ChatAppContext);

  const onChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const files = file.target.files;
    

    if(files){ 
      sendFileMessage(files[0]);
    }
  }
  
  return (
    <Dropdown
      icon={Icons.Add}
      title={''}
      render={() => {

        return (
          <div
            style={{
              position: 'absolute',
              border: '1px solid grey',
              width: '200px',
              height: '100px',
              bottom: '20px',
              left: '-150px',
              background: 'white',
              borderRadius: '5%',
            }}
          >
            <p
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
              }}
            >
              Click or drag file to upload
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '40px',
              }}
            >
              <input type='file' name='file' onChange={(file) => onChange(file)}/>
            </div>

          </div>
        );
      }}
    />
  );
};

export default FileInput;
