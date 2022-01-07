import { Schema, model } from 'mongoose';
import { Messages } from '../interfaces';

const messagesCollection = 'message';

const messagesSchema = new Schema<Messages>(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'users' },
		type: { type: String, required: true, max: 100 },
		message: { type: String, required: true, max: 100 },
	},
	{ versionKey: false }
);

export const messages = model<Messages>(messagesCollection, messagesSchema);
