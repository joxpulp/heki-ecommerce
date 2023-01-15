"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config/config");
var logs_1 = require("./services/logs");
var cluster_1 = __importDefault(require("cluster"));
var os_1 = __importDefault(require("os"));
var server_1 = __importDefault(require("./services/server"));
var socket_1 = require("./services/socket");
var CPUs = os_1.default.cpus().length;
var isCluster = false;
if (isCluster && cluster_1.default.isMaster) {
    logs_1.logger.info("NUMERO DE CPUS ===> " + CPUs);
    for (var i = 0; i < CPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker) {
        logs_1.logger.info("Worker " + worker.process.pid + " died at " + Date());
        cluster_1.default.fork();
    });
}
else if (!isCluster || isCluster) {
    (0, socket_1.ioServer)(server_1.default);
    server_1.default.listen(config_1.CONFIG.PORT, function () {
        return logs_1.logger.info("Server listening in " + config_1.CONFIG.PORT + " - PID: " + config_1.CONFIG.PID);
    });
    server_1.default.on('error', function (error) { return logs_1.logger.error("There was an error: " + error); });
}
