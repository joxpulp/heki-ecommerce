import { ObjectId } from 'mongoose';
import type { IncomingMessage } from 'http';
import type { Socket } from 'socket.io';

export interface ThumbnailsI {
	thumbnail_id: string;
	thumbnail: string;
}

export interface ProductI {
	_id?: string | ObjectId;
	name?: string;
	description?: string;
	category?: string;
	price?: number;
	stock?: number;
	quantity?: number;
	thumbnail?: string;
	thumbnail_id?: string;
	toObject(): any;
}

export interface NewProductI {
	name?: string;
	description?: string;
	category?: string;
	thumbnail?: string;
	thumbnail_id?: string;
	price?: number;
	stock?: number;
}

export interface AddressI {
	streetName?: string;
	streetNumber?: number;
	postalCode?: string;
	floor?: number;
	apt?: string;
}

export interface UserI {
	_id: string;
	avatar: string;
	avatar_id: string;
	name: string;
	age: number;
	email: string;
	deliveryAddress: string;
	pwd: string;
	purchases?: any;
	phone?: string;
	admin?: boolean;
	isValidPassword(password: string): Promise<boolean>;
}

export interface UpdateUserI {
	_id?: string;
	avatar?: string;
	avatar_id?: string;
	name?: string;
	age?: number;
	email?: string;
	password?: string;
	streetName?: string;
	streetNumber?: number;
	postalCode?: string;
	floor?: string;
	apt?: string;
	phone?: string;
}

export interface CartI {
	_id: string | ObjectId;
	userId?: string;
	total?: number;
	totalItems?: number;
	cartProducts?: ProductI[];
	deliveryAddress?: AddressI;
}

export interface OrderI {
	_id: string | ObjectId;
	userId?: string;
	total?: number;
	purchases?: ProductI[];
	state?: string;
}

export interface ProductQuery {
	title?: string;
	price?: number;
	code?: string;
	stock?: number;
	priceMax?: number;
	priceMin?: number;
	stockMax?: number;
	stockMin?: number;
}

export interface paramsWhatsapp {
	body: string;
	from: string;
	to: string;
	mediaUrl?: string | string[];
}

export interface Owner {
	name: string;
	address: string;
}

export interface Messages {
	userId: ObjectId;
	type: string;
	message: string;
}

declare global {
	namespace Express {
		interface User {
			_id: string;
			avatar?: string;
			avatar_id: string;
			name?: string;
			age?: number;
			email?: string;
			deliveryAddress?: AddressI;
			password?: string;
			phone?: string;
			isAdmin?: boolean;
		}
	}

	interface Error {
		errors: string[];
	}
}