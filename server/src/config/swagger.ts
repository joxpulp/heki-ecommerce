import swaggerJsdoc from 'swagger-jsdoc';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Heki Ecommerce Project',
			version: '0.0.1',
			description: 'Ecommerce API Application',
			contact: {
				name: 'Josue',
				email: 'joxpulp@gmail.com',
			},
		},
		servers: [
			{
				url: 'https://heki-ecommerce.onrender.com/api',
				description: 'Backend',
			},
		],
	},
	apis: ['src/routes/*'],
};

export const specs = swaggerJsdoc(options);
