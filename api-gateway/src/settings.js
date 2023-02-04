const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

IS_DEV = process.env.NODE_ENV !== 'production';

if (IS_DEV) dotenv.config();

PORT = process.env.PORT || 3000;

const rateLimitOptions = {
    windowMs: 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
};

/**
 * @typedef {Object} Service
 * @property {string} path - The path to proxy requests to the service.
 * @property {string} baseUrl - The base URL of the service.
 * @property {string} target - The target URL of the service.
 */

const CREATE_SESSION_SERVICE_BASE_URL = process.env.CREATE_SESSION_SERVICE_BASE_URL || 'http://localhost:3001';
const GET_SESSION_SERVICE_BASE_URL = process.env.GET_SESSION_SERVICE_BASE_URL || 'http://localhost:3002';
const CREATE_POST_SERVICE_BASE_URL = process.env.CREATE_POST_SERVICE_BASE_URL || 'http://localhost:3003';
const GET_POSTS_SERVICE_BASE_URL = process.env.GET_POSTS_SERVICE_BASE_URL || 'http://localhost:3004';

/**
 * @type {Service[]}
 * @description The services to proxy requests to.
 */
const services = [
    {
        path: '/create-anonymous-session',
        baseUrl: CREATE_SESSION_SERVICE_BASE_URL,
        target: `${CREATE_SESSION_SERVICE_BASE_URL}/create-anonymous-session`,
    },
    {
        path: '/get-session',
        baseUrl: GET_SESSION_SERVICE_BASE_URL,
        target: `${GET_SESSION_SERVICE_BASE_URL}/get-session`,
    },
    {
        path: '/create-post',
        baseUrl: CREATE_POST_SERVICE_BASE_URL,
        target: `${CREATE_POST_SERVICE_BASE_URL}/create-post`,
    },
    {
        path: '/get-posts',
        baseUrl: GET_POSTS_SERVICE_BASE_URL,
        target: `${GET_POSTS_SERVICE_BASE_URL}/get-posts`,
    },
];

module.exports = {
    IS_DEV,
    PORT,
    StatusCode: StatusCodes,
    rateLimitOptions,
    services,
};

