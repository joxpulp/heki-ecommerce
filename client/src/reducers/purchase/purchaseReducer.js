import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCommerce } from '../../services/api/ecommerce';
import { logout } from '../auth/authReducer';

export const getOrders = createAsyncThunk(
	'order/getOrders',
	async (_, { rejectWithValue }) => {
		try {
			const { data: orders } = await apiCommerce.get('/api/orders/list');
			return orders;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const getOrderById = createAsyncThunk(
	'order/getOrderById',
	async (orderId, { rejectWithValue }) => {
		try {
			const { data: order } = await apiCommerce.get(`/api/orders/list/${orderId}`);
			return order;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const newOrder = createAsyncThunk(
	'order/generateNewOrder',
	async (_, { rejectWithValue }) => {
		try {
			const {
				data: { msg },
			} = await apiCommerce.post(`/api/orders/new`);
			return msg;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const completeOrder = createAsyncThunk(
	'order/completeOrder',
	async (_, { rejectWithValue }) => {
		try {
			const {
				data: { msg },
			} = await apiCommerce.post(`/api/orders/complete`);
			return msg;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

const initialState = {
	orders: JSON.parse(localStorage.getItem('orders')) || [],
	orderProducts: [],
	totalPaid: JSON.parse(localStorage.getItem('totalPaid')) || null,
};

const purchaseSlice = createSlice({
	name: 'purchase',
	initialState,
	reducers: {
		clearOrder (state, action) {
			return {
				...state,
				orderProducts: []
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getOrders.fulfilled, (state, action) => {
				return {
					...state,
					orders: action.payload,
				};
			})
			.addCase(getOrders.rejected, (state, action) => {
				return {
					...state,
					orders: [],
				};
			})
			.addCase(getOrderById.fulfilled, (state, action) => {
				return {
					...state,
					orderProducts: action.payload.purchases,
					totalPaid: action.payload.total
				};
			})
			.addCase(getOrderById.rejected, (state, action) => {
				return {
					...state,
					order: [],
					totalPaid: null
				};
			})
			.addCase(logout.fulfilled, (state, action) => {
				return {
					orders: [],
					order: [],
					totalPaid: null,
				};
			});
	},
});

export const { clearOrder } = purchaseSlice.actions;
export default purchaseSlice.reducer;
