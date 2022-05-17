import {  Message, ReactionSummary } from 'chatkitty';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext } from 'react';
import { StyledBox } from 'react-chat-ui-kit';



interface EmojiProps {
    message: Message
}

const ReactionRenderer: React.FC<EmojiProps> = ({
    message
}: EmojiProps) => {

    const {currentUser, messageUnReactor, messageReactor} = useContext(ChatAppContext);

    const emojiClickListener = (reaction: ReactionSummary) => {
        let notIn = true;
        let reacted = false;
        if(message.reactions && currentUser){
            for(let i = 0; i< message.reactions?.length; i++){
                if(message.reactions[i].emoji.character === reaction.emoji.character){
                    for (let j = 0; j< message.reactions[i].count; j++){
                        if( currentUser.id === message.reactions[i].users[j].id){
                          notIn = false;
                          reacted = true;
                          messageUnReactor(reaction.emoji.aliases[0], message);
                          break;
                        }
                    }
                    if(notIn){
                        messageReactor(reaction.emoji.aliases[0], message);
                        reacted = true;
                    }
                }
                if(reacted){
                    break;
                }
            }
        }
        
    }
    
    return message.reactions ? (
        <StyledBox style={{
            marginTop: '1px',
            width: '1px',
            whiteSpace: 'nowrap'
        }}>
            {message.reactions.map((reaction) =>
                <div 
                    key={reaction.emoji.character} 
                    style={{cursor: 'pointer',  marginRight:'2px', display: 'inline-block', background:'grey', borderRadius:'25%', width: '40px', height:'25px'}} 
                    onClick={() => emojiClickListener(reaction)} 
                > 
                    <p style={{display: 'inline-block',verticalAlign: '-8px', fontSize:'18px'}}>{reaction.emoji.character}</p>
                    <p style={{display:'inline-block', paddingLeft: '2px', color:'white',verticalAlign: '-5px'}}>{reaction.count}</p>
                </div>
            )}
            
        </StyledBox>
        
    ):(<></>)
}


export default ReactionRenderer;