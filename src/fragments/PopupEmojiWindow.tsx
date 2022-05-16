import { Message } from "chatkitty";
import { Emoji } from "emoji-mart";
import { ChatAppContext } from "providers/ChatAppProvider";
import React, { useContext } from "react";
import { StyledBox, useHover } from "react-chat-ui-kit";

import '../styles/popupStyle.css';

interface popupProp{
    message: Message;
}

const PopupEmojiWindow: React.FC<popupProp> = ({message}: popupProp) => {

  const [isHovering, hoverProps] = useHover({ mouseEnterDelayMS: 0 });
  const emojiList = ['smiley', '+1', 'heart', 'clap', 'confused', 'worried']

  const {currentUser, messageUnReactor, messageReactor} = useContext(ChatAppContext);

  const emojiClickListener = (emoji: string) => {
    let notIn = true;
    let notReacted = true;

    

    if(currentUser && message.reactions){
      for(let i = 0; i<message.reactions.length; i++){
        if(message.reactions[i].emoji.aliases[0] === emoji){
          notIn = false;
          for(let j = 0; j< message.reactions[i].users.length; j++){
            if(message.reactions[i].users[j].id === currentUser.id){
                messageUnReactor(emoji, message);
                notReacted = false;
                break;
            }
          }
          if(notReacted){
            messageReactor(emoji, message);
            break;
          }
        }
      }
      if(notIn){
        messageReactor(emoji, message);
      }
    }
  }

  return(
      <div className="popup" {...hoverProps}>
          <div style={{cursor: 'pointer'}}><Emoji size={20} emoji={'smiley'}/></div>
          {isHovering && 
            <StyledBox 
              className="popuptext" 
              {...hoverProps}
            >
            {emojiList.map((emoji) => 
              <div key={emoji} 
                style={{cursor: 'pointer', display: 'inline-block', paddingLeft: '10px', width: '20px'}}
                onClick={() => emojiClickListener(emoji)}
              > 
                <Emoji size={20} emoji={emoji}/> 
              </div>
            )}   
            </StyledBox>}
        </div>
    );

}

export default PopupEmojiWindow;