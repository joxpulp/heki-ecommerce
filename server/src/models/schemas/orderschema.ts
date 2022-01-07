import { Schema, model } from 'mongoose';
import { OrderI, ProductI } from '../interfaces';

const orderCollection = 'order';

const orderProductSchema = new Schema<ProductI>(
	{
		_id: { type: Schema.Types.ObjectId, ref: 'products' },
		name: { type: String, required: true, max: 100 },
		description: { type: String, required: true, max: 300 },
		category: { type: String, required: true, max: 100 },
		price: {
			type: Number,
			required: true,
			min: [10, `El valor es {VALUE}, debe ser como minimo 10 USD`],
			max: [300000, `El valor es {VALUE}, debe ser como maximo 30000 USD`],
		},
		thumbnail_id: { type: String, required: true, max: 100 },
		thumbnail: { type: String, required: true, max: 100 },
		quantity: { type: Number, required: true },
	},
	{ versionKey: false }
);

const orderSchema = new Schema<OrderI>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users' },
		purchases: [orderProductSchema],
		state: { type: String, default: 'generated' },
		total: { type: Number },
	},
	{ versionKey: false, timestamps: true }
);
export const order = model<OrderI>(orderCollection, orderSchema);
