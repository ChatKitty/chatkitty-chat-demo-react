import React from "react";
import { Dropdown, Icons } from "react-chat-ui-kit";



interface FileInputProps{
    file?: File;
}

const FileInput: React.FC<FileInputProps> = () => {


    return(
        <Dropdown 
            icon={Icons.Add} 
            title={""} 
            render={() => { 
                console.log("test"); 
                return <p></p>}
                
            }
        />
    );
}

export default FileInput;