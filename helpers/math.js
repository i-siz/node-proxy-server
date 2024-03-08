const getAverageValue = (array) => array.reduce((a, b) => a + b, 0) / array.length;

module.exports = {
    getAverageValue,
};