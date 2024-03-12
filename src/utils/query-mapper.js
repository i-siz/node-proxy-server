const mapQueryToMeteorRequest = ({ date, count_only, were_dangerous_meteors }) => ({
    date: typeof date !== 'undefined' ? new Date(date) : null,
    countOnly: typeof count_only !== 'undefined' && count_only === 'true',
    wereDangerousMeteors: typeof were_dangerous_meteors !== 'undefined' && were_dangerous_meteors === 'true'
});

module.exports = {
    mapQueryToMeteorRequest,
};