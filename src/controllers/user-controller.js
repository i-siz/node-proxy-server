const { UserRequest } = require('../dto');
const { userService } = require('../services');

const handleError = (res, error) => {
    res.status(500).send(error.message);
}

const postUser = async (req, res) => {
    const request = new UserRequest(req.query);

    try {
        const data = res.json(userService.processUserData(request));
        res.json({ data });
    } catch (error) {
        (error) => handleError(res, error);
    }
}

module.exports = {
    postUser,
};