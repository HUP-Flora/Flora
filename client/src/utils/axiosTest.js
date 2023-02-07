import axios from 'axios';

const request = axios.create({
	baseURL: 'https://dog.ceo/api/breeds/image/',
	timeout: 1000,
});

request.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error);
		return Promise.reject(error);
	}
);
