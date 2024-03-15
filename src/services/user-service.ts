export const processUserData = (request: { userId: number; userName: string; apiKey: string }) => {
  console.log(`User data to be processed: ${JSON.stringify(request)}`);
  return true;
};
