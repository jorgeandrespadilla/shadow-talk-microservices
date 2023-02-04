const Joi = require('joi');

const GetSessionRequest = Joi.object({
    sessionCode: Joi.string().required(),
});

module.exports = {
    GetSessionRequest,
};