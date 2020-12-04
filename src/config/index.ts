import { init as initRedis } from "./redis";

const initDependecies = async () => {
    await initRedis();
};

export { initDependecies };