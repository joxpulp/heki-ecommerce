import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCommerce } from '../../services/api/ecommerce';

export const login = createAsyncThunk(
	'auth/login',
	async (body, { rejectWithValue }) => {
		try {
			const { data: user } = await apiCommerce.post('/api/auth/login', body);
			return user;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const logout = createAsyncThunk(
	'auth/logout',
	async (_, { rejectWithValue }) => {
		try {
			const { data: logout } = await apiCommerce.post('/api/auth/logout');
			return logout;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const signup = createAsyncThunk(
	'auth/signup',
	async (body, { rejectWithValue }) => {
		try {
			const { data: signup } = await apiCommerce.post('/api/auth/signup', body);
			return signup;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const isLoggedIn = createAsyncThunk(
	'auth/isLoggedIn',
	async (_, { rejectWithValue }) => {
		try {
			const { data: isLoggedIn } = await apiCommerce.get('/api/auth/isloggedin');
			return isLoggedIn;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

export const editUser = createAsyncThunk(
	'auth/editUser',
	async (formData, { rejectWithValue }) => {
		try {
			const { data: user } = await apiCommerce.patch(
				'/api/auth/edituser',
				formData
			);
			return user;
		} catch ({ response: { data } }) {
			return rejectWithValue(data);
		}
	}
);

const initialState = {
	userData: JSON.parse(localStorage.getItem('userData')) || {},
	loggedIn: false,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.rejected, (state, action) => {
				return {
					...state,
				};
			})
			.addCase(login.fulfilled, (state, action) => {
				return {
					...state,
					userData: action.payload.userData,
					loggedIn: action.payload.loggedIn,
				};
			})
			.addCase(logout.fulfilled, (state, action) => {
				return {
					...state,
					userData: {},
					loggedIn: action.payload.loggedIn,
				};
			})
			.addCase(logout.rejected, (state, action) => {
				return {
					...state,
					userData: {},
					loggedIn: false,
				};
			})
			.addCase(isLoggedIn.fulfilled, (state, action) => {
				return {
					...state,
					loggedIn: action.payload.loggedIn,
				};
			})
			.addCase(isLoggedIn.rejected, (state, action) => {
				return {
					...state,
					userData: {},
					loggedIn: action.payload.loggedIn,
				};
			})
			.addCase(editUser.fulfilled, (state, action) => {
				return {
					...state,
					userData: action.payload.userUpdated,
				};
			})
	},
});

export default authSlice.reducer;
