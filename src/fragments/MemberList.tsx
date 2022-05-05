import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-chat-ui-kit';
import {
  Drawer,
  FlexColumn,
  FlexRow,
  Heading,
  HeadingVariants,
  Icon,
  Icons,
  StyledBox,
} from 'react-chat-ui-kit';
import { ThemeContext } from 'styled-components';

import { ReactComponent as Logo } from '../assets/images/logo.svg';

const MemberList: React.FC = () => {
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);

  const { layout, hideMenu, channel } = useContext(ChatAppContext);

  const {
    joinedChannelsPaginator,
    onJoinedChannel,
    onLeftChannel,
    loading,
    currentUser,
    showChat,
    showJoinChannel,
    channelDisplayPicture,
  } = useContext(ChatAppContext);

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
      <Heading variant={HeadingVariants.INVERSE}>{channel?.name}</Heading>
    </Drawer>
  );
};

export default MemberList;
