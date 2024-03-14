const processUserData = (request) => {
  console.log(`User data to be processed: ${JSON.stringify(request)}`);
  return true;
};

module.exports = {
  processUserData,
};
