import {  User } from 'chatkitty';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useEffect, useState } from 'react';
import { Icon, Icons, StyledBox, useMediaQuery } from 'react-chat-ui-kit';
import {
  Drawer,
  Heading,
  HeadingVariants,
} from 'react-chat-ui-kit';
import { ThemeContext } from 'styled-components';

const MemberList: React.FC = () => {
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);

  const { layout, channel, memberListPaginator } = useContext(ChatAppContext);

  const [channelMembers, setChannelMembers] = useState<User[] | null>([]);

  useEffect(() => {
    if (!channel) {
      return;
    }
    const memberList = memberListPaginator(channel);
    memberList.then(resolved => {setChannelMembers(resolved)});
  });

  return (
    <Drawer
      open={layout.menu || isMedium}
      background={theme.backgrounds.primary}
    >
      <Heading
        variant={HeadingVariants.INVERSE}
        style={{ fontSize: '25px', marginTop: '30px', marginLeft: '10px' }}
      >
        {channel?.name}
      </Heading>

      
      <div>
        {channel?.creator != null &&
          <div>
            <Heading
              variant={HeadingVariants.INVERSE}
              style={{ marginTop: '30px', marginLeft: '10px', marginBottom: '15px' }}
            >
              Owner
            </Heading> 
            <StyledBox>
              <img 
                src={channel.creator.displayPictureUrl} 
                style={{
                  display: 'inline',
                  width: '25px',
                  marginLeft: '10px',
                  marginTop: '5px',
                  borderRadius: '50%',
                }}
              />
              <Icon
                icon={Icons.Presence}
                title={channel.creator.presence.online ? 'Connected' : 'Not connected'}
                color={channel.creator.presence.online ? 'success' : 'inactive'}
                style={{
                  display: 'inline',
                }}
              />
              <p style={{
                display: 'inline',
                marginLeft: '10px',
                width: '100px',
                color: 'yellow',
                verticalAlign: '10px',
              }}>
                {channel.creator.displayName}
              </p>
            </StyledBox>
          </div>
        }
      </div>

      <Heading
        variant={HeadingVariants.INVERSE}
        style={{ marginTop: '30px', marginLeft: '10px' }}
      >
        Channel Members
      </Heading>
      <StyledBox style={{marginTop: '15px'}}>
        {channelMembers?.map((user) => 
          <StyledBox key={user.id} style ={{height: '40px'}}>
            {user.name !== channel?.creator?.name && <div>
              <img 
                src={user.displayPictureUrl} 
                style={{
                  display: 'inline',
                  width: '25px',
                  marginLeft: '10px',
                  borderRadius: '50%',
                }}
              />
              <Icon
                icon={Icons.Presence}
                title={user.presence.online ? 'Connected' : 'Not connected'}
                color={user.presence.online ? 'success' : 'inactive'}
                style={{
                  display: 'inline',
                }}
              />
              <p style={{
                display: 'inline',
                marginLeft: '10px',
                width: '100px',
                color: 'white',
                verticalAlign: '7px',
              }}>
                {user.displayName}
              </p>
            </div>}
          </StyledBox>
        )}
      </StyledBox>
    </Drawer>
  );
};

export default MemberList;
