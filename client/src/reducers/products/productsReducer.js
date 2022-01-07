import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCommerce } from '../../services/api/ecommerce';

export const getProducts = createAsyncThunk(
	'products/getAllProducts',
	async () => {
		const {
			data: { products },
		} = await apiCommerce.get('/api/products/list');
		return products;
	}
);

export const getProductById = createAsyncThunk(
	'products/getProductById',
	async (id, { rejectWithValue }) => {
		try {
			const {
				data: { product },
			} = await apiCommerce.get(`/api/products/listbyid/${id}`);
			return product;
		} catch ({ response: { data } }) {
			return rejectWithValue(data.error);
		}
	}
);
export const addProduct = createAsyncThunk(
	'products/addProduct',
	async (body, { rejectWithValue }) => {
		try {
			const { data: addedProduct } = await apiCommerce.post(
				`/api/products/add`,
				body
			);
			return addedProduct;
		} catch ({ response: { data } }) {
			return rejectWithValue(data.error);
		}
	}
);
export const editProduct = createAsyncThunk(
	'products/editProduct',
	async (data, { rejectWithValue }) => {
		try {
			const { data: updatedProduct } = await apiCommerce.patch(
				`/api/products/update/${data.id}`,
				data.formData
			);
			return updatedProduct;
		} catch ({ response: { data } }) {
			return rejectWithValue(data.error);
		}
	}
);
export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id, { rejectWithValue }) => {
		try {
			await apiCommerce.delete(`/api/products/delete/${id}`);

			const {
				data: { products },
			} = await apiCommerce.get('/api/products/list');
			return products;
		} catch ({ response: { data } }) {
			return rejectWithValue(data.error);
		}
	}
);

const initialState = {
	products: [],
	product: [],
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		clearProduct(state, action) {
			return {
				...state,
				product: [],
			};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProducts.fulfilled, (state, action) => {
				return {
					...state,
					products: action.payload,
				};
			})
			.addCase(getProducts.rejected, (state, action) => {
				return {
					...state,
					products: [],
				};
			})
			.addCase(getProductById.fulfilled, (state, action) => {
				return {
					...state,
					product: action.payload,
				};
			})
			.addCase(getProductById.rejected, (state, action) => {
				return {
					...state,
					product: [],
				};
			})
			.addCase(editProduct.fulfilled, (state, action) => {
				return {
					...state,
					product: action.payload.updatedProduct,
				};
			})
			.addCase(editProduct.rejected, (state, action) => {
				return {
					...state,
					product: [],
				};
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				return {
					...state,
					products: action.payload,
				};
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				return {
					...state,
					products: [],
				};
			});
	},
});

export const { clearProduct } = productSlice.actions;
export default productSlice.reducer;
