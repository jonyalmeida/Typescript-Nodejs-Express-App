import http from "http";
import express from "express";
import "express-async-errors";
import { applyMiddleware, applyRoutes } from "./utils/index";
import middleware from "./middleware/index";
import errorHandlers from "./middleware/errorHandlers";
import routes from "./services/index";
import { initDependecies } from "./config/index";
import { logger } from "./config/logger";

//error handling
process.on("uncaughtException", e => {
    logger.error({
        message: `uncaughtException`,
        extra: e,
    });
    process.exit(1);
});

process.on("unhandledRejection", e => {
    logger.error({
        message: `unhandledRejection`,
        extra: e,
    });
    process.exit(1);
});

//create express app
const router = express();

//connect middleware and apply routes
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router)

//declare PORT and initialize server
const { PORT = 3000 } = process.env;
const server = http.createServer(router);

async function start() {
    await initDependecies();
    server.listen(PORT, () =>
        logger.info({
            message: `Server is running http://localhost:${PORT}...`,
        }),
    );
}

start()