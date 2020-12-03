import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils/index";
import middleware from "./middleware/index";
import routes from "./services/index";

//error handling
process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

//create express app
const app = express();

//connect middleware and apply routes
applyMiddleware(middleware, app);
applyRoutes(routes, app);

//declare PORT and initialize server
const { PORT = 3000 } = process.env;
const server = http.createServer(app);

server.listen(PORT, () =>
    console.log(`Server is running http://localhost:${PORT}...`)
);