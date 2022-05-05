import { ChatAppContext } from 'providers/ChatAppProvider';
import React, { useContext } from 'react';
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

const MemberList: React.FC = () => {
  const theme = useContext(ThemeContext);
  const isMedium = useMediaQuery(theme.mediaQueries.medium);

  const { layout, hideMenu } = useContext(ChatAppContext);

  return (
    <Drawer
      open={layout.menu || isMedium}
      background={theme.backgrounds.primary}
    >
      <StyledBox
        position="absolute"
        right="0"
        padding="6"
        display={['block', 'none']}
      >
        <Icon
          onClick={() => hideMenu()}
          icon={Icons.Cross}
          title="Close channels"
          color={theme.colors.onPrimary}
          clickable
        />
      </StyledBox>
    </Drawer>
  );
};

export default MemberList;
