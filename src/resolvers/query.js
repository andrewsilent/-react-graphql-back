module.exports = {
  userWithChannels: (_, { userId }, { dataSources }) => dataSources.serverAPI.getUserWithChannels(userId),
  userChannels:(_, { userId }, { dataSources }) => dataSources.serverAPI.getUserChannels(userId),
  userById: (_, { userId }, { dataSources }) => dataSources.serverAPI.getUserById(userId),
  userChannelWithStories: (_, { userId, channelId }, { dataSources }) => dataSources.serverAPI.getUserChannelWithStories(userId, channelId),
  userChannelStoriesItems: (_, { userId, channelId }, { dataSources }) => dataSources.serverAPI.getUserChannelStoriesItems(userId, channelId),
  userChannelStoriesWithItems: (_, { userId, channelId }, { dataSources }) => dataSources.serverAPI.getUserChannelStoriesWithItems(userId, channelId),
  userChannelStoryWithItems: (_, { userId, channelId, storyId }, { dataSources }) => dataSources.serverAPI.getUserChannelStoryWithItems(userId, channelId, storyId),
};
