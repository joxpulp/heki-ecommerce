"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryProduct = exports.orderComplete = exports.editProduct = exports.editUser = exports.addProductCart = exports.addProduct = exports.signup = exports.login = void 0;
var Yup = __importStar(require("yup"));
require("yup-phone");
var mimeType = ['image/png', 'image/jpeg', 'image/jpg'];
exports.login = Yup.object({
    body: Yup.object({
        email: Yup.string()
            .email('email field is invalid')
            .required('email field is required'),
        pwd: Yup.string()
            .min(8, 'password field must be at least 8 characters')
            .required('password field is required'),
    }).noUnknown(true),
});
exports.signup = Yup.object({
    body: Yup.object({
        email: Yup.string()
            .email('email field is invalid')
            .required('email field is required'),
        pwd: Yup.string()
            .min(8, 'password field must be at least 8 characters')
            .required('password field is required'),
        pwdConfirmation: Yup.string()
            .oneOf([Yup.ref('pwd'), null], 'password must match')
            .required('password confirmation is required'),
        name: Yup.string()
            .min(3, 'name field must be at least 3 characters')
            .required('name field is Required'),
        age: Yup.number()
            .min(16, 'age field must be at least 16 or more')
            .required('age field is required'),
        streetName: Yup.string()
            .min(4, 'street name field must at least 4 characters or more')
            .required('street name field is required'),
        streetNumber: Yup.number()
            .min(1, 'street number field must at least 1 characters or more')
            .required('street number field is required'),
        postalCode: Yup.string()
            .max(5, 'postal code field max 5 characters')
            .required('postal code field is required'),
        floor: Yup.number().min(1, 'floor field must at least 1 characters or more'),
        apt: Yup.string().min(1, 'apt field must at least 1 characters or more'),
        phone: Yup.string().phone().required('phone field is required'),
        admin: Yup.boolean(),
    }).noUnknown(true),
});
exports.addProduct = Yup.object({
    body: Yup.object({
        name: Yup.string()
            .min(3, 'title field must be at least 3 characters')
            .required('title field is required'),
        description: Yup.string()
            .min(20, 'description field must be at least 20 characters')
            .required('description field is required'),
        price: Yup.number()
            .min(10, 'price field min is 10')
            .max(30000, 'price field max is 30000')
            .required('price field is required'),
        category: Yup.string()
            .min(4, 'category field must be at least 4 characters')
            .required('category field is required'),
        stock: Yup.number()
            .min(1, 'stock field min is 1')
            .max(30000, 'stock field max is 30000')
            .required('stock field is required'),
    }).noUnknown(true),
    files: Yup.object({
        thumbnail: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable()
        .required('thumbnail image is required'),
});
exports.addProductCart = Yup.object({
    body: Yup.object({
        productId: Yup.string().required('product id field is required'),
        quantity: Yup.number()
            .min(1, 'quantity field must be at least 1')
            .required('quantity field is required'),
    }).noUnknown(true),
});
exports.editUser = Yup.object({
    body: Yup.object({
        email: Yup.string().email('email field is invalid'),
        pwd: Yup.string().min(8, 'password field must be at least 8 characters'),
        name: Yup.string().min(3, 'name field must be at least 3 characters'),
        age: Yup.number().min(16, 'age field must be at least 16 or more'),
        streetName: Yup.string().min(4, 'street name field must at least 4 characters or more'),
        streetNumber: Yup.number().min(1, 'street number field must at least 1 characters or more'),
        postalCode: Yup.string().max(4, 'postal code field must at least 10 characters or more'),
        floor: Yup.number().min(1, 'floor field must at least 1 characters or more'),
        apt: Yup.string().min(1, 'apt field must at least 1 characters or more'),
        phone: Yup.string(),
        admin: Yup.boolean(),
    }).noUnknown(true),
    files: Yup.object({
        avatar: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable(),
});
exports.editProduct = Yup.object({
    body: Yup.object({
        name: Yup.string().min(3, 'name field must be at least 3 characters'),
        description: Yup.string().min(20, 'description field must be at least 20 characters'),
        category: Yup.string().min(8, 'category field must be at least 8 characters'),
        price: Yup.number()
            .min(10, 'price field min is 10')
            .max(30000, 'price field max is 30000'),
        stock: Yup.number()
            .min(0, 'stock field min is 1')
            .max(30000, 'stock field max is 30000'),
    }).noUnknown(true),
    files: Yup.object({
        thumbnail: Yup.mixed().test('fileType', 'File type not supported only .png .jpg .jpeg', function (value) { return mimeType.includes(value.mimetype); }),
    })
        .noUnknown(true)
        .nullable(),
});
exports.orderComplete = Yup.object({
    body: Yup.object({
        orderId: Yup.string().required('orderId field is required'),
    }).noUnknown(true),
});
exports.queryProduct = Yup.object({
    query: Yup.object({
        title: Yup.string()
            .lowercase()
            .min(5, 'title query must be at least 5 characters'),
        code: Yup.string()
            .lowercase()
            .min(5, 'code query must be at least 5 characters'),
        priceMin: Yup.number().min(10, 'priceMin query min is 10'),
        priceMax: Yup.number().max(30000, 'priceMax query max is 30000'),
        stockMin: Yup.number().min(1, 'stockMin query min is 1'),
        stockMax: Yup.number().max(30000, 'stockMax query max is 30000'),
    }).noUnknown(true),
});
