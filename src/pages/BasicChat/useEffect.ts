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
      set: { setSelectedChannel },
    } = state;

    const { joinedChannels } = resources.get;

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
  }, [state.get.selectedChannel, resources.get.joinedChannels]);
};

export default useChannelSelection;
