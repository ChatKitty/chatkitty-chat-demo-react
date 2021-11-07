import { CurrentUser, DirectChannel } from 'chatkitty';

export const getParticipantList = (
  channel: DirectChannel,
  currentUser: CurrentUser
): string => {
  return channel.members
    .filter((member) => member.id !== currentUser.id)
    .map((member) => member.displayName)
    .join(', ');
};
