const { SQLDataSource } = require('datasource-sql');
const { omit } = require('lodash');
const { transformResponse, transformAndReduce, formatStoriesWithItems } = require('../utils/helper');

class ServerAPI extends SQLDataSource {
  async getUserWithChannels(userId) {
    //   const response = await this.knex
    //     .select('user_channel_mappings.id', 'user_channel_mappings.userId', 'user_channel_mappings.channelId')
    //     .from('user_channel_mappings')
    //     .where({ userId: userId });

    //   return response;
    return {};
  }

  async user(userId) {
    const response = (await this.knex.select('*').from('user').where({ id: userId }))[0];

    return omit(response, ['pwd']);
  }

  async channel(userId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'channel.*'
      )
      .from('user_channel_mappings')
      .where({ userId: userId })
      .join('channel', 'channel.id', 'user_channel_mappings.channelId');

    // .select('*')
    // .from('channel')
    // .where({ id: channelId })

    console.log('response 3 >', response);
    return response;
  }

  async getUserWithChannels(userId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'user.email as user.email',
        'user.isStaff as user.isStaff',
        'user.id as user.id',
        'user.screenName as user.screenName',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId'
      )
      .from('user_channel_mappings')
      .where({ userId })
      .join('user', 'user.id', 'user_channel_mappings.userId')
      .join('channel', 'channel.id', 'user_channel_mappings.channelId');

    const result = transformResponse(response, ['user', 'channel']);

    return result;
  }

  async getUserById(userId) {
    return await this.knex.select('*').from('user').where({ id: userId });
  }

  async getUserChannels(userId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId'
      )
      .from('user_channel_mappings')
      .where({ userId })
      .join('channel', 'channel.id', 'user_channel_mappings.channelId');

    const result = transformResponse(response, ['channel']);

    return result;
  }

  async getUserChannelWithStories(userId, channelId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'user_channel_mappings.lastStoryInteracted',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId',
        'stories.id as stories.id',
        'stories.type as stories.type',
        'stories.title as stories.title',
        'stories.subtitle as stories.subtitle',
        'stories.status as stories.status',
        'stories.deleted as stories.deleted',
        'stories.channelId as stories.channelId',
        'stories.created as stories.created',
        'stories.updated as stories.updated'
      )
      .from('user_channel_mappings')
      .where('user_channel_mappings.userId', userId)
      .where('user_channel_mappings.channelId', channelId)
      .andWhere('stories.type', 'default')
      .andWhere('stories.deleted', 0)
      .andWhere('stories.status', 'published')
      .join('channel', 'channel.id', 'user_channel_mappings.channelId')
      .join('stories', 'stories.channelId', 'channel.id');

    const result = transformAndReduce(response, ['channel', 'stories'], 'stories');

    return result;
  }

  async getUserChannelStoriesItems(userId, channelId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId',
        'stories.id as stories.id',
        'stories.type as stories.type',
        'stories.title as stories.title',
        'stories.subtitle as stories.subtitle',
        'stories.status as stories.status',
        'stories.deleted as stories.deleted',
        'stories.channelId as stories.channelId',
        'stories.created as stories.created',
        'stories.updated as stories.updated',
        'items.id as items.id',
        'items.url as items.url',
        'items.userId as items.userId',
        'items.storyId as items.storyId',
        'items.type as items.type',
        'items.text as items.text',
        'items.title as items.title',
        'items.published as items.published',
        'items.created as items.created',
        'items.updated as items.updated',
        'items.abstract as items.abstract',
        'items.headline as items.headline',
        'items.sourceName as items.sourceName',
        'items.subHeadline as items.subHeadline'
      )
      .from('user_channel_mappings')
      .where('user_channel_mappings.userId', userId)
      .where('user_channel_mappings.channelId', channelId)
      .andWhere('stories.type', 'default')
      .andWhere('stories.deleted', 0)
      .andWhere('stories.status', 'published')
      .andWhere('items.published', 1)
      .join('channel', 'channel.id', 'user_channel_mappings.channelId')
      .join('stories', 'stories.channelId', 'channel.id')
      .join('items', 'items.storyId', 'stories.id');

    const result = transformAndReduce(response, ['channel', 'stories', 'items'], 'items');

    return result;
  }

  async getUserChannelStoriesWithItems(userId, channelId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'user.email as user.email',
        'user.isStaff as user.isStaff',
        'user.id as user.id',
        'user.screenName as user.screenName',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId',
        'stories.id as stories.id',
        'stories.type as stories.type',
        'stories.title as stories.title',
        'stories.subtitle as stories.subtitle',
        'stories.status as stories.status',
        'stories.deleted as stories.deleted',
        'stories.channelId as stories.channelId',
        'stories.created as stories.created',
        'stories.updated as stories.updated',
        'items.id as items.id',
        'items.url as items.url',
        'items.userId as items.userId',
        'items.storyId as items.storyId',
        'items.type as items.type',
        'items.text as items.text',
        'items.title as items.title',
        'items.published as items.published',
        'items.created as items.created',
        'items.updated as items.updated',
        'items.abstract as items.abstract',
        'items.headline as items.headline',
        'items.sourceName as items.sourceName',
        'items.subHeadline as items.subHeadline',
        'images.files as items.files'
      )
      .from('user_channel_mappings')
      .where('user_channel_mappings.userId', userId)
      .where('user_channel_mappings.channelId', channelId)
      .andWhere('stories.type', 'default')
      .andWhere('stories.deleted', 0)
      .andWhere('stories.status', 'published')
      .andWhere('items.published', 1)
      .join('user', 'user.id', 'user_channel_mappings.userId')
      .join('channel', 'channel.id', 'user_channel_mappings.channelId')
      .join('stories', 'stories.channelId', 'channel.id')
      .join('items', 'items.storyId', 'stories.id')
      .leftJoin('item_media', 'items.id', 'item_media.item_id')
      .leftJoin('item_media_image', 'item_media_image.item_media_id', 'item_media.id')
      .leftJoin('images', 'images.id', 'item_media_image.image_id');

    const result = formatStoriesWithItems(response, ['user', 'channel', 'stories', 'items'], 'items');

    return result;
  }

  async getUserChannelStoryWithItems(userId, channelId, storyId) {
    const response = await this.knex
      .select(
        'user_channel_mappings.id',
        'user_channel_mappings.userId',
        'user_channel_mappings.channelId',
        'user_channel_mappings.userRoleId',
        'channel.owner as channel.owner',
        'channel.locale as channel.locale',
        'channel.deleted as channel.deleted',
        'channel.archived as channel.archived',
        'channel.isDefault as channel.isDefault',
        'channel.id as channel.id',
        'channel.subdomain as channel.subdomain',
        'channel.organisationId as channel.organisationId',
        'channel.name as channel.name',
        'channel.createdByUserId as channel.createdByUserId',
        'stories.id as stories.id',
        'stories.type as stories.type',
        'stories.title as stories.title',
        'stories.subtitle as stories.subtitle',
        'stories.status as stories.status',
        'stories.deleted as stories.deleted',
        'stories.channelId as stories.channelId',
        'stories.created as stories.created',
        'stories.updated as stories.updated',
        'items.id as items.id',
        'items.url as items.url',
        'items.userId as items.userId',
        'items.storyId as items.storyId',
        'items.type as items.type',
        'items.text as items.text',
        'items.title as items.title',
        'items.published as items.published',
        'items.created as items.created',
        'items.updated as items.updated',
        'items.abstract as items.abstract',
        'items.headline as items.headline',
        'items.sourceName as items.sourceName',
        'items.subHeadline as items.subHeadline'
      )
      .from('user_channel_mappings')
      .where('user_channel_mappings.userId', userId)
      .andWhere('user_channel_mappings.channelId', channelId)
      .andWhere('stories.id', storyId)
      .andWhere('stories.type', 'default')
      .andWhere('stories.deleted', 0)
      .andWhere('stories.status', 'published')
      .andWhere('items.published', 1)
      .join('channel', 'channel.id', 'user_channel_mappings.channelId')
      .join('stories', 'stories.channelId', 'channel.id')
      .join('items', 'items.storyId', 'stories.id');

    const result = transformAndReduce(response, ['channel', 'stories', 'items'], 'items');

    return result;
  }
}

module.exports = ServerAPI;
