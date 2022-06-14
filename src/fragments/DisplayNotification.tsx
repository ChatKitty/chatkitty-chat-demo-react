import { isUserMessage, SystemSentMessageNotification } from 'chatkitty';
import React from 'react';
import { Avatar, FlexColumn, FlexRow, StyledBox } from 'react-chat-ui-kit';

import UserAvatar from './UserAvatar';

import './../styles/slide.css';

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
      className='slideIn'
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
          <div style={{ marginLeft:'5px'}}>
            <UserAvatar user={notification.data.message.user}/>
          </div>
          <FlexColumn style={{ marginLeft:'10px', marginTop:'15px'}}>
            <strong>{notification.channel?.name}</strong>
            <strong>{notification.data.message.user.displayName}</strong>
            <p style={{width:'150px', height:'50px', overflow:'hidden'}}>
              <strong>{notification.data.message.user.displayName}:</strong>
               {notification.body}
            </p>
          </FlexColumn>
          
        </FlexRow>
      ):(<>
        <FlexRow onClick={onClick}>
          <div style={{marginLeft:'5px'}}><Avatar/></div>
          <FlexColumn style={{ marginLeft:'10px', marginTop:'15px'}}>
            <strong >#channel name</strong>
            <p style={{width:'150px', height:'50px', overflow:'hidden'}}> <strong>username: </strong> message text message text message textmessage textmessage textmessage textmessage text </p>
          </FlexColumn>
          
        </FlexRow>


        </>)}
    </StyledBox>
  );
};

export default DisplayNotification;
