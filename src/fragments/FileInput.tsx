import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useState } from 'react';
import { Dropdown, Icons } from 'react-chat-ui-kit';

interface FileInputProps {
  file?: File;
}

const FileInput: React.FC<FileInputProps> = () => {

  const {sendFileMessage} = useContext(ChatAppContext);
  const [file, setFile] = useState<File>();


  const onChange = (file: React.ChangeEvent<HTMLInputElement>) => {
    const files = file.target.files;
    if(files){ 
      setFile(files[0]);
    }
  }

  const onClick = () => {
    if(file){
      sendFileMessage(file);
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
              Press Button to Upload
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '10px',
                marginLeft:'10px', 
                cursor:'pointer',
              }}
            >
              <input type='file' onChange={(file) => onChange(file)}/>
            </div>

            <button 
              style={{
                marginLeft:'35%',
                marginTop:'15px',
              }}
              onClick={onClick}
            >
            Submit
            </button>

          </div>
        );
      }}
    />
  );
};

export default FileInput;
