import { Channel } from 'chatkitty';
import { useState } from 'react';
import { Modal } from 'types';

export interface BasicChatState {
  get: {
    selectedChannel: Channel | undefined;
    modal: Modal;
    sidePanelOpen: boolean;
  };
  set: {
    setSelectedChannel: React.Dispatch<
      React.SetStateAction<Channel | undefined>
    >;
    setModal: React.Dispatch<React.SetStateAction<Modal>>;
    setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const useBasicChatState = (): BasicChatState => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [modal, setModal] = useState<Modal>();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);

  return {
    get: {
      selectedChannel,
      modal,
      sidePanelOpen,
    },
    set: {
      setSelectedChannel,
      setModal,
      setSidePanelOpen,
    },
  };
};

export default useBasicChatState;
