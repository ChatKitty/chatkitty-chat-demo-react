import { Channel, User } from 'chatkitty';
import { useState } from 'react';
import { Modal } from 'types';

export interface BasicChatState {
  get: {
    selectedChannel: Channel | undefined;
    modal: Modal;
    sidePanelOpen: boolean;
    online: boolean;
    usersTyping: User[];
  };
  set: {
    setSelectedChannel: React.Dispatch<
      React.SetStateAction<Channel | undefined>
    >;
    setModal: React.Dispatch<React.SetStateAction<Modal>>;
    setSidePanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setOnline: React.Dispatch<React.SetStateAction<boolean>>;
    setUsersTyping: React.Dispatch<React.SetStateAction<User[]>>;
  };
}

const useBasicChatState = (): BasicChatState => {
  const [selectedChannel, setSelectedChannel] = useState<Channel | undefined>();
  const [modal, setModal] = useState<Modal>();
  const [sidePanelOpen, setSidePanelOpen] = useState(true);
  const [online, setOnline] = useState(true);
  const [usersTyping, setUsersTyping] = useState<User[]>([]);

  return {
    get: {
      selectedChannel,
      modal,
      sidePanelOpen,
      online,
      usersTyping,
    },
    set: {
      setSelectedChannel,
      setModal,
      setSidePanelOpen,
      setOnline,
      setUsersTyping,
    },
  };
};

export default useBasicChatState;
