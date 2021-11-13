import kitty from 'clients/kitty';
import { BasicChatResources } from 'pages/BasicChat/useResources';
import { BasicChatState } from 'pages/BasicChat/useState';
import { useEffect } from 'react';

const useChannelSelection = (
  resources: BasicChatResources,
  state: BasicChatState
): void => {
  useEffect(() => {
    /**
     * Fetch messages if channel changes
     **/
    const {
      get: { selectedChannel },
      set: { setSelectedChannel, setOnline },
    } = state;

    const {
      get: { joinedChannels },
      set: { setCurrentUser },
    } = resources;

    if (selectedChannel) {
      const initChannel = async () => {
        await resources.request.fetchMessages(selectedChannel);
      };

      initChannel();
    } else {
      if (joinedChannels.length > 0) {
        const defaultChannel = joinedChannels[0];
        setSelectedChannel(defaultChannel);
      }
    }

    // reset selected channels if no available channels
    if (joinedChannels.length === 0) {
      setSelectedChannel(undefined);
    }

    // keep currentUser in sync
    kitty.onCurrentUserChanged((currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser);
      }
    });

    // set online status
    kitty.onCurrentUserOnline(() => {
      location.reload();
    });

    kitty.onCurrentUserOffline(() => {
      setOnline(false);
    });
  }, [state.get.selectedChannel, resources.get.joinedChannels]);
};

export default useChannelSelection;
