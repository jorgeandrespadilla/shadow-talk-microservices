const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

IS_DEV = process.env.NODE_ENV !== 'production';

if (IS_DEV) dotenv.config();

PORT = process.env.PORT || 3000;

const rateLimitOptions = {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
};

/**
 * @typedef {Object} Service
 * @property {string} path - The path to proxy requests to the service.
 * @property {string} target - The target URL of the service.
 */

/**
 * @type {Service[]}
 * @description The services to proxy requests to.
 */
const services = [
    {
        path: '/test',
        target: 'http://localhost:3001/',
    },
]

module.exports = {
    IS_DEV,
    PORT,
    StatusCode: StatusCodes,
    rateLimitOptions,
    services,
};

