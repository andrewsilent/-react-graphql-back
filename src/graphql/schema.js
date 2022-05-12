const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    userById(userId: ID!): [User]
    userChannels(userId: ID!): [UserChannels]
    userWithChannels(userId: ID!): UserWithChannels
    userChannelWithStories(userId: ID!, channelId: ID!): [UserChannelWithStories]
    userChannelStoriesItems(userId: ID!, channelId: ID!): [UserChannelStoriesItems]
    userChannelStoriesWithItems(userId: ID!, channelId: ID!): [UserChannelStoriesWithItems]
    userChannelStoryWithItems(userId: ID!, channelId: ID!, storyId: ID!): [UserChannelStoryWithItems]
  }

  type UserWithChannels {
    id: ID
    userId: Int
    channelId: Int
    user: User
  }

  type User {
    id: ID
    email: String
    screenName: String
    isStaff: Int
    channel: [Channel]
  }

  type Channel {
    id: ID
    owner: Int
    deleted: Int
    name: String
    archived: Int
    isDefault: Int
    locale: String
    subdomain: String
    organisationId: Int
    createdByUserId: Int
  }


  type UserChannels {
    id: ID
    userId: Int
    channelId: Int
    userRoleId: Int
    lastStoryInteracted: Int
    channel(userId: ID): Channel
  }

  type UserChannelWithStories {
    id: ID
    userId: Int
    channelId: Int
    userRoleId: Int
    lastStoryInteracted: Int
    channel: Channel
    stories: [Story]
  }

  type Story {
    id: ID
    type: String
    title: String
    deleted: Int
    status: String
    channelId: Int
    created: String
    updated: String
    subtitle: String
  }

  type UserChannelStoriesItems {
    id: ID
    userId: Int
    channelId: Int
    userRoleId: Int
    lastStoryInteracted: Int
    channel: Channel
    stories: Story
    items: [Item]
  }

  type UserChannelStoryWithItems {
    id: ID
    userId: Int
    channelId: Int
    userRoleId: Int
    lastStoryInteracted: Int
    channel: Channel
    stories: Story
    items: [Item]
  }

  type UserChannelStoriesWithItems {
    id: ID
    userId: Int
    channelId: Int
    userRoleId: Int
    lastStoryInteracted: Int
    user: User
    channel: Channel
    stories: [Stories]
  }

  type Stories {
    id: ID
    type: String
    title: String
    deleted: Int
    status: String
    channelId: Int
    created: String
    updated: String
    subtitle: String
    items: [Item]
  }

  type Item {
    id: ID
    url: String
    userId: Int
    storyId: Int
    type: String
    text: String
    title: String
    published: Int
    created: String
    updated: String
    abstract: String
    headline: String
    sourceName: String
    subHeadline: String
    imageUrl: String
  }
`;
