import {  ReactionSummary} from 'chatkitty';
import React from 'react';
import { StyledBox } from 'react-chat-ui-kit';



interface EmojiProps {
    reactions: ReactionSummary[] | undefined
}

const ReactionRenderer: React.FC<EmojiProps> = ({
    reactions
}: EmojiProps) => {

    if(reactions !== undefined) {
        console.log(reactions[0].emoji.character);
    }
    
    return reactions ? (
        <StyledBox style={{
            marginTop: '1px',
            width: '1px',
            whiteSpace: 'nowrap'
        }}>
            {reactions.map((reactionList) =>
                <div key={reactionList.emoji.character.length}> 
                    <p>
                        {reactionList.emoji.character} 
                        {reactionList.count}
                    </p>
                </div>
            )}
            
        </StyledBox>
        
    ):(<></>)
}


export default ReactionRenderer;