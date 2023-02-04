const dotenv = require('dotenv');
const { StatusCodes } = require('http-status-codes');

IS_DEV = process.env.NODE_ENV  !== 'production';

if (IS_DEV) dotenv.config();

PORT = process.env.PORT || 3000;
ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS || 'http://localhost:3000';
DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/shadowtalk';

module.exports = {
    IS_DEV,
    PORT,
    DATABASE_URL,
    StatusCode: StatusCodes,
    corsOptions: {
        origin: ALLOWED_ORIGINS.split(','),
        optionsSuccessStatus: 200,
    },
};