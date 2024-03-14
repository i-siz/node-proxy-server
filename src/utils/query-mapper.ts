export const mapQueryToMeteorRequest = ({
  date,
  count_only,
  were_dangerous_meteors,
}: {
  date: string;
  count_only: string;
  were_dangerous_meteors: string;
}) => ({
  date: typeof date !== 'undefined' ? new Date(date) : null,
  countOnly: count_only === 'true',
  wereDangerousMeteors: were_dangerous_meteors === 'true',
});

export const mapQueryToUserRequest = ({
  user_id,
  user_name,
  api_key,
}: {
  user_id: string;
  user_name: string;
  api_key: string;
}) => ({
  userId: typeof user_id !== 'undefined' ? user_id : null,
  userName: typeof user_name !== 'undefined' ? user_name : null,
  apiKey: typeof api_key !== 'undefined' ? api_key : null,
});
