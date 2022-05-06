import {  User } from 'chatkitty';
import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-chat-ui-kit';
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
        style={{ fontSize: '20px', marginTop: '5px', marginLeft: '5px' }}
      >
        {channel?.name}
      </Heading>

      <Heading
        variant={HeadingVariants.INVERSE}
        style={{ marginTop: '20px', marginLeft: '5px' }}
      >
        Channel Members
      </Heading>
    </Drawer>
  );
};

export default MemberList;
