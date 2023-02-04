const Joi = require('joi');

const CreatePostRequest = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    createdBy: Joi.string().required(), // sessionCode
});

module.exports = {
    CreatePostRequest,
};