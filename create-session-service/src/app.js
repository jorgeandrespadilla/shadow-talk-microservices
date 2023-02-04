const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require("morgan");
const mongoose = require('mongoose');
const { v4: uuid } = require('uuid');
const { faker } = require('@faker-js/faker');
const { AnonymousSession } = require('./models');
const { PORT, DATABASE_URL, StatusCode, corsOptions } = require('./settings');

function configureMiddlewares(app) {
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(helmet());
    app.use(morgan("dev"));
}

const app = express();
configureMiddlewares(app);

// Check if the service is up and running
app.get('/health-check', (_, res) => {
    res.status(StatusCode.OK).send('OK');
});

app.post('/create-anonymous-session', async (_, res) => {
    try {
        const sessionCode = uuid();

        const anonymousSession = await AnonymousSession.create({
            sessionCode: sessionCode,
            nickName: faker.internet.userName(),
            avatar: `https://api.dicebear.com/5.x/identicon/svg?seed=${sessionCode}`,
            createdAt: new Date(),
        });

        res.status(StatusCode.OK).send(anonymousSession);
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
});


(async () => {
    try {
        // Connect to the database
        mongoose.set('strictQuery', false);
        await mongoose.connect(DATABASE_URL);
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();
