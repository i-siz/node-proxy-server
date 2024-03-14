const mapQueryToMeteorRequest = ({ date, count_only, were_dangerous_meteors }) => ({
  date: typeof date !== 'undefined' ? new Date(date) : null,
  countOnly: count_only === 'true',
  wereDangerousMeteors: were_dangerous_meteors === 'true',
});

const mapQueryToUserRequest = ({ user_id, user_name, api_key }) => ({
  userId: typeof user_id !== 'undefined' ? user_id : null,
  userName: typeof user_name !== 'undefined' ? user_name : null,
  apiKey: typeof api_key !== 'undefined' ? api_key : null,
});

module.exports = {
  mapQueryToMeteorRequest,
  mapQueryToUserRequest,
};
