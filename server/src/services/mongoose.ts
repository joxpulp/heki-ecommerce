import { connect } from 'mongoose';
import { CONFIG } from '../config/config';
import { logger } from './logs';

export const mongoose = async (): Promise<void> => {
	try {
		await connect(CONFIG.MONGO_URL);
		logger.info('Conectado a base de datos');
	} catch (error) {
		logger.error(error);
	}
};
