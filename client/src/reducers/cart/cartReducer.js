import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCommerce } from '../../services/api/ecommerce';
import { logout } from '../auth/authReducer';

export const getCart = createAsyncThunk(
	'cart/getCart',
	async (_, { rejectWithValue }) => {
		try {
			const { data: [cart] } = await apiCommerce.get('/api/cart/list');
			return cart;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const addProductCart = createAsyncThunk(
	'cart/addProductToCart',
	async (data, { rejectWithValue }) => {
		try {
			await apiCommerce.post(`/api/cart/add`, data);

			const { data: [cart] } = await apiCommerce.get('/api/cart/list');
			return cart;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const removeProductCart = createAsyncThunk(
	'cart/removeProductFromCart',
	async (productId, { rejectWithValue }) => {
		try {
			await apiCommerce.delete(`/api/cart/delete/${productId}`);

			const { data: [cart] } = await apiCommerce.get('/api/cart/list');
			return cart;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

const initialState = {
	cartData: JSON.parse(localStorage.getItem('cartData')) || [],
	total: JSON.parse(localStorage.getItem('total')) || null,
	totalItems: JSON.parse(localStorage.getItem('totalItems')) || null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getCart.fulfilled, (state, action) => {
				return {
					...state,
					cartData: action.payload.cartProducts,
					total: action.payload.total,
					totalItems: action.payload.totalItems
				};
			})
			.addCase(getCart.rejected, (state, action) => {
				return {
					cartData: [],
					total: null,
					totalItems: null
				};
			})
			.addCase(addProductCart.fulfilled, (state, action) => {
				return {
					...state,
					cartData: action.payload.cartProducts,
					total: action.payload.total,
					totalItems: action.payload.totalItems,
				};
			})
			.addCase(removeProductCart.fulfilled, (state, action) => {
				return {
					...state,
					cartData: action.payload.cartProducts,
					total: action.payload.total,
					totalItems: action.payload.totalItems,
				};
			})
			.addCase(removeProductCart.rejected, (state, action) => {
				return {
					...state,
					cartData: [],
					total: null,
					totalItems: null,
				};
			})
			.addCase(logout.fulfilled, (state, action) => {
				return {
					cartData: [],
					total: null,
					totalItems: null,
				};
			});
	},
});

export default cartSlice.reducer;
