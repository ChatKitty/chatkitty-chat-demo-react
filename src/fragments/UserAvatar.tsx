import { User } from 'chatkitty';
import React from 'react';
import { StyledBox } from 'react-chat-ui-kit';

interface UserAvatarProp {
    user: User;
}

const UserAvater: React.FC<UserAvatarProp> = ({
    user,
}: UserAvatarProp) => {
    return (
        <StyledBox 
            style={{
            display: 'inline',
            }}>
            <img 
                src={user.displayPictureUrl} 
                style={{
                    borderRadius: '50%',
                    width: '25px',
                    marginLeft: '10px',
                    marginTop: '5px',
                }}
            />
        </StyledBox>
    )
}

export default UserAvater;