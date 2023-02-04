# Shadow Talk Microservices

Shadow Talk Microservices were built using the following technologies:
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

## Description

This repository contains the source code of the microservices that make up the Shadow Talk application. The microservices are:
- `create-session-service`: Service for creating a new anonymous session.
- `get-session-service`: Service for getting an anonymous session information.
- `create-post-service`: Service for creating a new post.
- `get-posts-service`: Service for getting posts.

Additionally, the repository contains a sample service (`sample-service-template`) that can be used as a template for creating new microservices, as well as the source code of the API Gateway that is used to communicate with the microservices from the client.

### Microservices structure

Each microservice is a Node.js application that uses the Express framework. The microservices are structured as follows:
- `src` - Contains the source code of the microservice.
  - `app.js` - The entry point of the microservice with the Express application and routes.
  - `models.js` - Contains the models of the microservice (used for database operations).
  - `schemas.js` - Contains the schemas of the microservice (used for validation).
  - `settings.js` - Contains the settings of the microservice (used for configuration).

## Installation

Go to each microservice directory and run the following command:
```bash
npm install
```

## Environment Variables

> Before starting the microservices, make sure you have configured the environment variables. For development, you can create a `.env` file in the root directory of each microservice and add the environment variables there (you can use the `.env.example` file as a template). For production, you can set the environment variables in the server's environment.*

The following environment variables are used by all microservices:

- `PORT` - The port the microservice will listen on. Defaults to `3000`.
- `ALLOWED_ORIGINS` - A comma-separated list of allowed origins. Defaults to `http://localhost:3000`. Used by microservices to only allow requests from the API Gateway.
- `DATABASE_URL` - The URL of the MongoDB database. Defaults to `mongodb://localhost:27017/shadowtalk`.

*To configure the environment variables of the API Gateway, see the README file in the `api-gateway` project.*

## Usage

To start each microservice, go to the microservice directory and run the following command:
```bash
npm start
```

## Development

To start each microservice in development mode, go to the microservice directory and run the following command:
```bash
npm run dev
```

## Useful Resources

- https://medium.com/geekculture/create-an-api-gateway-using-nodejs-and-express-933d1ca23322
- https://github.com/crizstian/cinema-microservice
- https://github.com/Jayvirrathi/microservices
