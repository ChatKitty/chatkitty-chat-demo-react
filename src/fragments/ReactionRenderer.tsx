import {  ReactionSummary} from 'chatkitty';
import { Emoji } from 'emoji-mart';
import React from 'react';
import { StyledBox } from 'react-chat-ui-kit';



interface EmojiProps {
    reactions: ReactionSummary[] | undefined
}

const ReactionRenderer: React.FC<EmojiProps> = ({
    reactions
}: EmojiProps) => {
    
    if (reactions != undefined){
        reactions[0].emoji
    }

    return reactions ? (
        <StyledBox style={{
            marginTop: '1px',
            width: '1px',
            whiteSpace: 'nowrap'
        }}>
            {reactions.map((reactionList) =>
                <div key={reactionList.emoji.character.length}> 
                    <Emoji size={15} emoji={ reactionList.emoji.character}/>
                </div>
            )}
            
        </StyledBox>
        
    ):(<></>)
}


export default ReactionRenderer;