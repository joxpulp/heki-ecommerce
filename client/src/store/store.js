import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth/authReducer';
import productsReducer from '../reducers/products/productsReducer';
import cartReducer from '../reducers/cart/cartReducer';
import purchaseReducer from '../reducers/purchase/purchaseReducer';
import uiReducer from '../reducers/ui/uiReducer';

const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		cart: cartReducer,
		purchase: purchaseReducer,
		ui: uiReducer,
	},
	// HIDE REDUX DEVTOOLS
	devTools: process.env.NODE_ENV !== 'production',
});

export default store;
