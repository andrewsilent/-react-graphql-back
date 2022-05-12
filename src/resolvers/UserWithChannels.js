module.exports = {
  user: (parent, { userId }, { dataSources }) => dataSources.serverAPI.user(parent[0].userId),
};
