const { mapAsteroidsData } = require('./asteroid-mapper');
const { mapQueryToMeteorRequest, mapQueryToUserRequest } = require('./query-mapper');

module.exports = {
    mapAsteroidsData,
    mapQueryToMeteorRequest,
    mapQueryToUserRequest,
};