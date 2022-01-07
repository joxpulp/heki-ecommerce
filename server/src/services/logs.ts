import log4js from 'log4js';

log4js.configure({
	appenders: {
		console: { type: 'console' },
	},
	categories: {
		default: { appenders: ['console'], level: 'all' },
	},
});

export const logger = log4js.getLogger();
