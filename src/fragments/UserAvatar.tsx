import { User } from 'chatkitty';
import React from 'react';
import { StyledBox } from 'react-chat-ui-kit';

interface UserAvatarProp {
  user: User;
  style: React.CSSProperties | undefined;
}

const UserAvatar: React.FC<UserAvatarProp> = ({
  user,
  style,
}: UserAvatarProp) => {
  return (
    <StyledBox
      style={{
        display: 'inline',
      }}
    >
      <img src={user.displayPictureUrl} style={style} />
    </StyledBox>
  );
};

export default UserAvatar;
