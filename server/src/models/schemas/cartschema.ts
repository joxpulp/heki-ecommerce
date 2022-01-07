import { Schema, model } from 'mongoose';
import { CartI, ProductI, AddressI } from '../interfaces';

const cartCollection = 'cart';

const cartProductSchema = new Schema<ProductI>(
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

const address = new Schema<AddressI>(
	{
		streetName: { type: String, required: true, max: 100 },
		streetNumber: { type: Number, required: true, max: 100 },
		postalCode: { type: String, required: true, max: 100 },
		floor: { type: Number, max: 100 },
		apt: { type: String, max: 100 },
	},
	{ versionKey: false }
);

const cartSchema = new Schema<CartI>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users' },
		total: { type: Number },
		totalItems: { type: Number },
		cartProducts: [cartProductSchema],
		deliveryAddress: [address],
	},
	{ versionKey: false, timestamps: true }
);
export const cart = model<CartI>(cartCollection, cartSchema);
