const { mapQueryToUserRequest } = require('../utils');
const { userService, roverPhotoService } = require('../services');

const postUser = async (req, res, next) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await userService.processUserData(request);
    const roverPhotoUrl = await roverPhotoService.getRoverPhotoUrl();
    res.send(`<img src="${roverPhotoUrl}">`);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postUser,
};
