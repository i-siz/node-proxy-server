const mapQueryToMeteorRequest = ({ date, count_only, were_dangerous_meteors }) => ({
    date: typeof date !== 'undefined' ? new Date(date) : null,
    countOnly: count_only === 'true',
    wereDangerousMeteors: were_dangerous_meteors === 'true'
});

module.exports = {
    mapQueryToMeteorRequest,
};