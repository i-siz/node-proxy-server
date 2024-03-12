const { mapQueryToUserRequest } = require('../utils');
const { userService, roverPhotoService } = require('../services');

const postUser = async (req, res, next) => {
    const request = mapQueryToUserRequest(req.query);

    try {
        // eslint-disable-next-line no-unused-vars
        const userDataProcessed = await userService.processUserData(request);
        const roverPhotoUrl = await roverPhotoService.getRoverPhotoUrl();
        res.send(`<img src="${roverPhotoUrl}">`);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    postUser,
};