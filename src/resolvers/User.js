module.exports = {
  channel: (parent, { userId }, { dataSources }) => dataSources.serverAPI.channel(parent.id),
};
