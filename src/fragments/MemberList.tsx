import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useEffect } from 'react';
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

  const { layout, channel } = useContext(ChatAppContext);

  useEffect(() => {
    if (!channel) {
      return;
    }
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
