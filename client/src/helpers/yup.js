import * as Yup from 'yup';
import 'yup-phone';

const mimeType = ['image/png', 'image/jpeg', 'image/jpg'];

export const loginValidation = Yup.object({
	email: Yup.string()
		.email('The email address is invalid, try again')
		.required('Required'),
	pwd: Yup.string()
		.min(8, 'Password must be at least 8 characters')
		.required('Required'),
});

export const signupValidation = Yup.object({
	email: Yup.string()
		.email('The email address is invalid, try again')
		.required('Email is required'),
	pwd: Yup.string()
		.min(8, 'Password must be 8 mininum characters')
		.required('Password is required'),
	pwdConfirmation: Yup.string()
		.oneOf([Yup.ref('pwd'), null], 'Password must match')
		.required('Password confirmation is required'),
	name: Yup.string()
		.min(3, 'Name must be at least 3 characters')
		.required('Name is Required'),
	age: Yup.number()
		.min(16, 'You must have 16 years old or more to register')
		.required('Age is required'),
	streetName: Yup.string()
		.min(4, 'Street name must at least 4 characters or more')
		.required('Street name is required'),
	streetNumber: Yup.number()
		.min(1, 'Street number must at least 1 characters or more')
		.required('Street number is required'),
	postalCode: Yup.string()
		.max(5, 'Postal code max 5 characters')
		.required('Postal code is required'),
	floor: Yup.number()
		.min(1, 'Floor must at least 1 characters or more')
		.required('Floor is required'),
	apt: Yup.string()
		.min(1, 'Apartment must at least 1 characters or more')
		.required('Apartment is required'),
	phone: Yup.string()
		.phone('AR', false, 'Phone number is wrong')
		.required('Phone number is required'),
});

export const editProfileValidation = Yup.object({
	name: Yup.string().min(3, 'Name must be at least 3 characters'),
	pwd: Yup.string().min(8, 'Password must be at least 8 characters'),
	age: Yup.number().min(16, 'Your age must be 16 or more'),
	streetName: Yup.string().min(
		4,
		'street name field must at least 4 characters or more'
	),
	streetNumber: Yup.number().min(
		1,
		'street number field must at least 1 characters or more'
	),
	postalCode: Yup.string().max(
		4,
		'postal code field must at least 10 characters or more'
	),
	floor: Yup.number().min(1, 'floor field must at least 1 characters or more'),
	apt: Yup.string().min(1, 'apt field must at least 1 characters or more'),
	phone: Yup.string(),
	avatar: Yup.mixed()
		.nullable()
		.test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => !value || (value && mimeType.includes(value.type))
		),
});

export const addProductValidation = Yup.object({
	name: Yup.string()
		.min(3, 'Product name must be at least 3 characters')
		.required('Product name is required'),
	description: Yup.string()
		.min(20, 'Product description must be at least 20 characters')
		.required('Product description is required'),
	category: Yup.string()
		.min(4, 'Product category must be at least 4 characters')
		.required('Product category is required'),
	price: Yup.number()
		.min(10, 'Min price is 10')
		.max(30000, 'Max price is 30000')
		.required('Product price is required'),
	stock: Yup.number()
		.min(1, 'Stock min is 1')
		.max(30000, 'Stock max is 30000')
		.required('Product stock is required'),
	thumbnail: Yup.mixed()
		.nullable()
		.required('Thumbnail image is required')
		.test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => value && mimeType.includes(value.type)
		),
});

export const editProductValidation = Yup.object({
	name: Yup.string().min(3, 'Product name must be at least 3 characters'),
	description: Yup.string().min(
		20,
		'Product description must be at least 20 characters'
	),
	category: Yup.string().min(4, 'Product category be at least 4 characters'),
	price: Yup.number()
		.min(10, 'Min price is 10')
		.max(30000, 'Max price is 30000'),
	stock: Yup.number()
		.min(0, 'stock field min is 0')
		.max(30000, 'stock field max is 30000'),
	thumbnail: Yup.mixed()
		.nullable()
		.test(
			'fileType',
			'File type not supported only .png .jpg .jpeg',
			(value) => !value || (value && mimeType.includes(value.type))
		),
});
