import { isUserMessage, SystemSentMessageNotification } from 'chatkitty';
import React from 'react';
import { FlexColumn, FlexRow, StyledBox } from 'react-chat-ui-kit';

interface notificationProp {
  notification?: SystemSentMessageNotification;
}

const DisplayNotification: React.FC<notificationProp> = ({
  notification,
}: notificationProp) => {
  const onClick = () => {
    console.log(notification);
  };

  return (
    <StyledBox
      style={{
        width: '250px',
        height: '100px',
        background: 'white',
        position: 'absolute',
        bottom: '5px',
        left: '5px',
      }}
    >
      {notification && isUserMessage(notification.data.message) && (
        <FlexRow onClick={onClick}>
          <img
            src={notification.data.message.user.displayPictureUrl}
            style={{ maxWidth: '20%', borderRadius: '50%', marginLeft:'1%', top:'50%' }}
          />
          <FlexColumn style={{ marginLeft:'1%'}}>
            <strong>{notification.channel?.name}</strong>
            <strong>{notification.data.message.user.displayName}</strong>
            <p>{notification.body}</p>
          </FlexColumn>
          
        </FlexRow>
      )}
    </StyledBox>
  );
};

export default DisplayNotification;
