import axios from 'axios';

export const apiCommerce = axios.create({
	baseURL: 'http://localhost:8080',
	withCredentials: true,
});
