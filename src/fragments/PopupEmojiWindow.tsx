import { Message } from "chatkitty";
import { ChatAppContext } from "providers/ChatAppProvider";
import React, { useContext } from "react";
import { StyledBox } from "react-chat-ui-kit";


import EmojiInput from "./EmojiInput";
import EmojiSuggestion from "./EmojiSuggestion";

interface popupProp{
    message: Message;
}

const PopupEmojiWindow: React.FC<popupProp> = ({message}: popupProp) => {


  const {currentUser, messageUnReactor, messageReactor} = useContext(ChatAppContext);

  const emojiClickListener = (emoji: string) => {
    let notIn = true;
    let notReacted = true;
    messageReactor('U+1F600',message);
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
    else{
      messageReactor(emoji, message);
    }
  }

  return(
        <StyledBox  style={{marginRight:"320px", marginBottom:"150px"}} >
          <EmojiInput value="" onSelection={emojiClickListener} />
          <EmojiSuggestion value="" onSelection={emojiClickListener} />
        </StyledBox>
    );

}

export default PopupEmojiWindow;