const { transform, reduce } = require('lodash');

module.exports.transformResponse = (data, fields) => {
  const result = data.map(e =>
    transform(
      e,
      (result, value, key) => {
        const str = key.toString().split('.');
        if (fields.some(e => e === str[0])) {
          result[str[0]] = { ...result[str[0]], [str[1]]: value };
        } else result[key] = value;
      },
      {}
    )
  );

  return result;
};

module.exports.transformAndReduce = (data, fields, reduceBy) => {
  const transformed = data.map(e =>
    transform(
      e,
      (result, value, key) => {
        const str = key.toString().split('.');
        if (fields.some(e => e === str[0])) {
          result[str[0]] = { ...result[str[0]], [str[1]]: value };
        } else result[key] = value;
      },
      {}
    )
  );

  const result = [];
  result.push(
    reduce(
      transformed,
      (result, value) => {
        result.data = value;
        (result[reduceBy] || (result[reduceBy] = [])).push(value[reduceBy]);
        result.data[reduceBy] = result[reduceBy];
        return result.data;
      },
      {}
    )
  );

  return result;
};

module.exports.formatStoriesWithItems = (data, fields) => {
  const transformed = data.map(e =>
    transform(
      e,
      (result, value, key) => {
        const str = key.toString().split('.');
        if (fields.some(e => e === str[0])) {
          result[str[0]] = { ...result[str[0]], [str[1]]: value };
        } else result[key] = value;
      },
      {}
    )
  );

  console.log('transformed', transformed);

  const onlyItems = transformed.map(e => e.items);

  onlyItems.map(e => {
    e.imageUrl = JSON.parse(e.files) ? JSON.parse(e.files).original.url : null;
    return e;
  });

  const storiesMap = new Map();

  transformed.map(e =>
    storiesMap.has(e.stories.id) ? storiesMap.get(e.stories.id) : storiesMap.set(e.stories.id, e.stories)
  );

  const stories = Object.fromEntries(storiesMap);
  onlyItems.map(e => (stories[e.storyId].items || (stories[e.storyId].items = [])).push(e));

  const result = [
    {
      stories: Object.values(stories),
      user: transformed[0].user,
      channel: transformed[0].channel,
      userId: transformed[0].userId,
      channelId: transformed[0].channelId,
      userRoleId: transformed[0].userRoleId,
      lastStoryInteracted: transformed[0].lastStoryInteracted,
    },
  ];

  return result;
};
