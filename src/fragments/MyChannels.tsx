import { Channel } from 'chatkitty';
import React, { useContext, useEffect, useState } from 'react';
import {
  FlexRow,
  Heading,
  HeadingVariants,
  Icon,
  Icons,
  ScrollView,
} from 'react-chat-ui-kit';
import { usePaginator } from 'react-chat-ui-kit';

import { ChatAppContext } from '../providers/ChatAppProvider';

import DisplayNotification from './DisplayNotification';
import MyChannelListItem from './MyChannelListItem';

const MyChannels: React.FC = () => {
  const {
    joinedChannelsPaginator,
    onJoinedChannel,
    onLeftChannel,
    loading,
    currentUser,
    currentNotification,
    showChat,
    showJoinChannel,
  } = useContext(ChatAppContext);
  const [notificationView, setNotificationView] = useState<boolean>(false);
  const [channelList, setChannelList] = useState<Channel[]>([]);
  const [isMentionNotification, setIsMentionNotification] =
    useState<boolean>(false);

  const {
    items: channels,
    append,
    remove,
    containerRef,
    boundaryRef,
  } = usePaginator({
    paginator: () => joinedChannelsPaginator(),
    onInitialPageFetched: (items) => {
      if (items) {
        showChat(items[0]);
        setChannelList(items);
      }
    },
    dependencies: [currentUser],
  });

  useEffect(() => {
    return onJoinedChannel((channel) => {
      append([channel]);
    });
  }, [currentUser]);

  useEffect(() => {
    return onLeftChannel((channel) => {
      remove((c) => c.id === channel.id);
    });
  }, [currentUser]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const test: any = currentNotification?.data.message;
    if (test && test.mentions) {
      setIsMentionNotification(true);
    }

    if (currentNotification) {
      setNotificationView(true);
    }
    const interval = setInterval(() => {
      setNotificationView(false);
      clearInterval(interval);
    }, 10000);
  }, [currentNotification]);

  const onClick = () => {
    setNotificationView(false);
    if (currentNotification?.channel) {
      if (channelList) {
        const currentNotificationChannelId = currentNotification.channel.id;
        channelList.find((currentChannel) => {
          if (currentChannel.id === currentNotificationChannelId) {
            showChat(currentChannel);
          }
        });
      }
    }
  };

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <FlexRow
        justifyContent="space-between"
        mx={6}
        marginBottom={1}
        display="relative"
      >
        <Heading variant={HeadingVariants.INVERSE}>Channels</Heading>
        <Icon
          icon={Icons.Add}
          color={'onPrimary'}
          onClick={() => {
            showJoinChannel();
          }}
          title="Join channel"
          clickable
        />
      </FlexRow>

      <ScrollView ref={containerRef}>
        {channels.map((channel) => (
          <MyChannelListItem key={channel.id} channel={channel} />
        ))}
        <div ref={boundaryRef} />
      </ScrollView>
      {notificationView && currentNotification && (
        <div onClick={onClick}>
          <DisplayNotification
            notification={currentNotification}
            isMentionNotification={isMentionNotification}
          />
        </div>
      )}
    </>
  );
};

export default MyChannels;
