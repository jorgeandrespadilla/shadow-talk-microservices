const Joi = require('joi');

const SampleRequest = Joi.object({
    id: Joi.number().integer().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
});

module.exports = {
    SampleRequest,
};