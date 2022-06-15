import { isUserMessage, SystemSentMessageNotification } from 'chatkitty';
import moment from 'moment';
import React from 'react';
import { Avatar, FlexColumn, FlexRow, StyledBox } from 'react-chat-ui-kit';

import UserAvatar from './UserAvatar';

import './../styles/slide.css';


interface notificationProp {
  notification?: SystemSentMessageNotification| null;
  isReplyNotification?: boolean;
  isMentionNotification?: boolean; 
}

const DisplayNotification: React.FC<notificationProp> = ({
  notification,
  isReplyNotification,
  isMentionNotification,
}: notificationProp) => {

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
        borderRadius:'5%',
        cursor:'pointer'
      }}
      
    >
      {notification && isUserMessage(notification.data.message) ? (
        <FlexRow >
          <div style={{ marginLeft:'5px'}}>
            <UserAvatar 
              user={notification.data.message.user} 
              style={{
                display: 'inline-block',
                width: '35px',
                borderRadius: '50%',
              }}
            />
          </div>
          <FlexColumn style={{ marginLeft:'10px', marginTop:'15px'}}>
            <strong>#{notification.channel?.name}</strong>
            <p style={{width:'150px', height:'40px', overflow:'hidden', marginBottom:'5px'}}>
              <strong>{notification.data.message.user.displayName}</strong>{ 
              isReplyNotification ? (<p> replied to your message</p>) : 
              isMentionNotification ? (<p> mentioned you in a message</p>):
              (<p>: {notification.body}</p>)
              }
            </p>
            {moment(notification.createdTime).format('LT')}
          </FlexColumn>
          
        </FlexRow>
      ):(<>
        <FlexRow>
          <div style={{marginLeft:'5px'}}>
            <Avatar/>
          </div>
          <FlexColumn style={{ marginLeft:'10px', marginTop:'15px'}}>
            <strong >#channel name</strong>
            <p style={{width:'150px', height:'40px', overflow:'hidden', marginBottom:'5px'}}> 
              <strong>username:</strong> message text
            </p>
            time
          </FlexColumn>
          
        </FlexRow>

        </>)}
    </StyledBox>
  );
};

export default DisplayNotification;
