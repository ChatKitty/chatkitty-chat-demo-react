import {
  Channel,
  DirectChannel,
  isDirectChannel,
  isPublicChannel,
  PublicChannel,
} from 'chatkitty';

export const pickDirectChannels = (channels: Channel[]): DirectChannel[] =>
  channels.filter((channel) => isDirectChannel(channel)) as DirectChannel[];

export const pickPublicChannels = (channels: Channel[]): PublicChannel[] =>
  channels.filter((channel) => isPublicChannel(channel)) as PublicChannel[];

export const sortChannels = (channels: Channel[]): void => {
  channels.sort();
};
