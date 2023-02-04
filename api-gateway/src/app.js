const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const axios = require('axios');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { IS_DEV, StatusCode, services, rateLimitOptions } = require('./settings');

function configureMiddlewares(app) {
    app.use(cors());
    app.use(rateLimit(rateLimitOptions));
    configureProxies(app);
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan("dev"));
}

function configureProxies(app) {
    // Redirect requests to the corresponding services
    services.forEach(service => {
        console.log(`Proxying requests from ${service.path} to ${service.target}`);
        app.use(service.path, createProxyMiddleware({
            target: service.target,
            changeOrigin: true,
            pathRewrite: {
                [`^${service.path}`]: '',
            },
            logLevel: IS_DEV ? 'debug' : 'info',
        }));
    });
}

const app = express();
configureMiddlewares(app);

// Check if the API Gateway is up and running
app.get('/health-check', (_, res) => {
    res.status(StatusCode.OK).send('OK');
});

// Checks if all services are up and running
app.get('/health-check-all', async (_, res) => {
    const promises = services.map(service => axios.get(service.baseUrl + '/health-check'));
    const results = await Promise.allSettled(promises);
    const isAllUp = results.every(result => result.status === 'fulfilled');
    res.status(isAllUp ? StatusCode.OK : StatusCode.SERVICE_UNAVAILABLE).send(isAllUp ? 'OK' : 'NOT OK');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});