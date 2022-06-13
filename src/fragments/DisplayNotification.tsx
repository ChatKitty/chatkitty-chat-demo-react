import { isUserMessage, SystemSentMessageNotification } from 'chatkitty';
import React from 'react';
import { Avatar, FlexColumn, FlexRow, StyledBox } from 'react-chat-ui-kit';

import UserAvatar from './UserAvatar';

interface notificationProp {
  notification?: SystemSentMessageNotification| null;
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
        height: '90px',
        background: 'white',
        position: 'absolute',
        bottom: '5px',
        left: '5px',
        borderRadius:'5%'
      }}
    >
      {notification && isUserMessage(notification.data.message) ? (
        <FlexRow onClick={onClick}>
          <UserAvatar user={notification.data.message.user}/>
          <FlexColumn style={{ marginLeft:'1%'}}>
            <strong>{notification.channel?.name}</strong>
            <strong>{notification.data.message.user.displayName}</strong>
            <p>{notification.body}</p>
          </FlexColumn>
          
        </FlexRow>
      ):(<>
        <FlexRow onClick={onClick} position='relative'>
          <div style={{marginTop:'25px', marginLeft:'5px'}}><Avatar/></div>
          <FlexColumn style={{ marginLeft:'10px', marginTop:'15px'}}>
            <strong >#channel name</strong>
            <p style={{position:'absolute', width:'150px', height:'50px', overflow:'hidden'}}> <strong>username: </strong> message text message text message textmessage textmessage textmessage textmessage text </p>
          </FlexColumn>
          
        </FlexRow>


        </>)}
    </StyledBox>
  );
};

export default DisplayNotification;
