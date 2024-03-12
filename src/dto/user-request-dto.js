class UserRequest {

    constructor(query) {
        this.userId = typeof query.user_id !== 'undefined' ? query.user_id : null;
        this.userName = typeof query.user_name !== 'undefined' ? query.user_name : null;
        this.apiKey = typeof query.api_key !== 'undefined' ? query.api_key : null;
    }

}

module.exports = UserRequest;