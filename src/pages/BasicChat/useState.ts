import { Channel } from 'chatkitty';
import { useState } from 'react';
import { Modal } from 'types';

export interface BasicChatState {
  get: {
    selectedChannel: Channel | undefined;
    modal: Modal;
    sidePanelOpen: boolean;
    online: boolean;
  };
  set: {
    setSelectedChannel: React.Dispatch<
      React.SetStateAction<Channel | undefined>
    >;
    setModal: React.Dispatch<React.SetStateAction<Modal>>;
    setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOnline: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const useBasicChatState = (): BasicChatState => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [modal, setModal] = useState<Modal>();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [online, setOnline] = useState(true);

  return {
    get: {
      selectedChannel,
      modal,
      sidePanelOpen,
      online,
    },
    set: {
      setSelectedChannel,
      setModal,
      setSidePanelOpen,
      setOnline,
    },
  };
};

export default useBasicChatState;
