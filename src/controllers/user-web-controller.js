const { mapQueryToUserRequest } = require('../utils');
const { userService, roverPhotoService } = require('../services');

const displayRover = async (req, res, next) => {
  const request = mapQueryToUserRequest(req.body);

  try {
    await userService.processUserData(request);
    const roverPhotoUrl = await roverPhotoService.getRoverPhotoUrl();
    res.render('user.html', { roverPhotoUrl, title: 'Rover photo' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  displayRover,
};
