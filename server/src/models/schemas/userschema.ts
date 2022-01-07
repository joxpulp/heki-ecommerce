import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { AddressI, UserI } from '../interfaces';

const userCollection = 'user';

const address = new Schema<AddressI>({
	streetName: { type: String, required: true },
	streetNumber: { type: Number, required: true },
	postalCode: { type: String, required: true },
	floor: { type: Number },
	apt: { type: String, max: 100 },
});

const userSchema = new Schema<UserI>(
	{
		avatar: { type: String },
		avatar_id: { type: String },
		email: { type: String, required: true, unique: true, max: 100 },
		pwd: { type: String, required: true, max: 100 },
		name: { type: String, required: true, max: 100 },
		deliveryAddress: address,
		age: { type: Number, required: true },
		phone: { type: String, required: true },
		admin: { type: Boolean, default: false },
	},
	{ versionKey: false }
);

// Encrypt password
userSchema.pre('save', async function (next) {
	const user = this;
	const hash = await bcrypt.hash(user.pwd, 10);
	this.pwd = hash;
	next();
});

userSchema.pre('findOneAndUpdate', async function (next) {
	const user = this as any;
	if (user._update.$set.pwd) {
		const hash = await bcrypt.hash(user._update.$set.pwd, 10);
		user._update.$set.pwd = hash;
	}
	next();
});

// Compare if the password is valid with encrypted password stored in database.
userSchema.methods.isValidPassword = async function (password) {
	const user = this;
	const compare = await bcrypt.compare(password, user.pwd);
	return compare;
};

export const userModel = model<UserI>(userCollection, userSchema);
