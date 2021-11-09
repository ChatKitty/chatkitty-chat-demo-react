import {
  Channel,
  ChatKittyUserReference,
  CurrentUser,
  DirectChannel,
  Message,
} from 'chatkitty';
import {
  useCreateChannel,
  useCurrentUser,
  useHideChannel,
  useJoinChannel,
  useJoinedChannels,
  useLeaveChannel,
  useMessages,
  useSendMessageDraft,
  useUpdateMessageDraft,
} from 'hooks';

export interface BasicChatResources {
  loading: {
    fetchingCurrentUser: boolean;
    fetchingMessages: boolean;
    leavingChannel: boolean;
    joiningChannel: boolean;
    hidingChannel: boolean;
    creatingChannel: boolean;
    updatingMessage: boolean;
    sendingMessage: boolean;
    fetchingJoinedChannels: boolean;
  };
  get: {
    currentUser: CurrentUser | undefined;
    messages: Message[];
    joinedChannels: Channel[];
  };
  set: {
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
  request: {
    leaveChannel: (channel: Channel) => void;
    joinChannel: (channel: Channel) => void;
    hideChannel: (channel: DirectChannel) => void;
    createChannel: ({
      type,
      members,
      name,
    }: {
      type: string;
      members?: ChatKittyUserReference[] | undefined;
      name?: string | undefined;
    }) => Promise<Channel | undefined>;
    updateMessage: (channel: Channel, draft: string) => void;
    sendMessage: (channel: Channel, draft: string) => void;
    fetchMessages: (channel: Channel) => void;
    fetchJoinedChannels: () => void;
  };
}

const useBasicChatResources = (): BasicChatResources => {
  const {
    isLoading: fetchingJoinedChannels,
    resource: joinedChannels,
    makeRequest: fetchJoinedChannels,
  } = useJoinedChannels();
  const { isLoading: fetchingCurrentUser, resource: currentUser } =
    useCurrentUser();
  const { isLoading: leavingChannel, makeRequest: leaveChannel } =
    useLeaveChannel();
  const { isLoading: joiningChannel, makeRequest: joinChannel } =
    useJoinChannel();
  const { isLoading: hidingChannel, makeRequest: hideChannel } =
    useHideChannel();
  const { isLoading: creatingChannel, makeRequest: createChannel } =
    useCreateChannel();
  const { isLoading: updatingMessage, makeRequest: updateMessage } =
    useUpdateMessageDraft();
  const { isLoading: sendingMessage, makeRequest: sendMessage } =
    useSendMessageDraft();

  const {
    isLoading: fetchingMessages,
    resource: messages,
    setResource: setMessages,
    makeRequest: fetchMessages,
  } = useMessages();

  return {
    loading: {
      fetchingCurrentUser,
      fetchingMessages,
      leavingChannel,
      joiningChannel,
      hidingChannel,
      creatingChannel,
      updatingMessage,
      sendingMessage,
      fetchingJoinedChannels,
    },
    get: {
      currentUser,
      messages,
      joinedChannels,
    },
    set: {
      setMessages,
    },
    request: {
      leaveChannel,
      joinChannel,
      hideChannel,
      createChannel,
      updateMessage,
      sendMessage,
      fetchMessages,
      fetchJoinedChannels,
    },
  };
};

export default useBasicChatResources;
