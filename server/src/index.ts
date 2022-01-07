import { CONFIG } from './config/config';
import { logger } from './services/logs';
import cluster from 'cluster';
import os from 'os';
import Server from './services/server';
import { ioServer } from './services/socket';

const CPUs = os.cpus().length;
const isCluster = false;

if (isCluster && cluster.isMaster) {
	logger.info(`NUMERO DE CPUS ===> ${CPUs}`);

	for (let i = 0; i < CPUs; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		logger.info(`Worker ${worker.process.pid} died at ${Date()}`);
		cluster.fork();
	});
} else if (!isCluster || isCluster) {
	ioServer(Server);
	Server.listen(CONFIG.PORT, () =>
		logger.info(`Server listening in ${CONFIG.PORT} - PID: ${CONFIG.PID}`)
	);

	Server.on('error', (error) => logger.error(`There was an error: ${error}`));
}
