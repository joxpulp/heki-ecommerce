import { Schema, model } from 'mongoose';
import { ProductI } from '../interfaces';

const productsCollection = 'product';

const productsSchema = new Schema<ProductI>(
	{
		name: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 300 },
		category: { type: String, required: true, max: 100 },
		price: {
			type: Number,
			required: true,
			min: [10, `Value is {VALUE}, min 10 USD`],
			max: [300000, `Value is {VALUE}, max 30000 USD`],
		},
		stock: {
			type: Number,
			required: true,
			min: [0, `Value is {VALUE}, min 0`],
			max: [300000, `Value is {VALUE}, max 30000`],
		},
		thumbnail_id: { type: String, required: true, max: 100 },
		thumbnail: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const products = model<ProductI>(productsCollection, productsSchema);
