import {
  Channel,
  CreateChannelRequest,
  CurrentUser,
  DirectChannel,
} from 'chatkitty';
import UserListItem from 'components/User/UserListItem';
import { useUsers } from 'hooks';

interface JoinDirectChannelModalProps {
  currentUser: CurrentUser;
  channels: DirectChannel[];
  closeModal: () => void;
  createChannel: (params: CreateChannelRequest) => void;
  setSelectedChannel: (channel: Channel) => void;
}

const JoinDirectChannelModal: React.FC<JoinDirectChannelModalProps> = ({
  currentUser,
  channels,
  closeModal,
  createChannel,
  setSelectedChannel,
}) => {
  const { isLoading: usersLoading, resource: users } = useUsers();

  return (
    <div className="bg-white rounded-lg w-11/12 sm:w-8/12 md:w-1/2 max-w-md z-20 max-h-96 overflow-y-scroll webkit-scroll">
      <div className="flex flex-col items-start p-4">
        <button className="flex flex-row w-full pb-2" onClick={closeModal}>
          <h1 className="flex-1 text-gray-800 font-medium text-xl text-left">
            Direct Message
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {usersLoading ? (
          'Loading...'
        ) : (
          <>
            {users.length > 0 ? (
              users.map(
                (user) =>
                  user.id !== currentUser.id && (
                    <UserListItem
                      key={user.id}
                      user={user}
                      handleClick={() => {
                        const channel = channels.filter(
                          (channel) =>
                            channel.members.filter(
                              (member) => member.id === user.id
                            ).length > 0
                        );

                        if (channel.length > 0) {
                          setSelectedChannel(channel[0]);
                          closeModal();
                        } else {
                          createChannel({
                            type: 'DIRECT',
                            members: [
                              {
                                username: user.name,
                              },
                            ],
                          });
                          closeModal();
                        }
                      }}
                    />
                  )
              )
            ) : (
              <p className="font-light">No available channels to join.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JoinDirectChannelModal;
