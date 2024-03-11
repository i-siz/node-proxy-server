class MeteorRequest {

    constructor(query) {
        this.date = typeof query.date !== 'undefined' ? new Date(query.date) : null;
        this.countOnly = typeof query.count_only !== 'undefined' && query.count_only === 'true';
        this.wereDangerousMeteors = typeof query.were_dangerous_meteors !== 'undefined' && query.were_dangerous_meteors === 'true';
    }

}

module.exports = MeteorRequest;