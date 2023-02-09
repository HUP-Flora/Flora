// import axios from 'axios';
//
// const token = localStorage.getItem('flora-token');
//
// export const request = axios.create({
//
// 	baseURL: 'https://dog.ceo/api/breeds/image/',
// 	timeout: 1000,
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	}
// });
//
// import axios from 'axios';
//
// const getDog = (url, data) {
// 	axios({
// 		method: 'get',
// 		url: url,,
// 		data: data,
// 	})
// 	.then(res => {
// 		console.log(res);
// 	})
// }
//
// import request from "";
//
// const getDog = (url, data) {
// 	request({
// 		method: 'get',
// 		url: url,,
// 		data: data,
// 		header: {header: localStorage.get("TOKEN")}
// 	}
// }
//
// request.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	(error) => {
// 		console.log(error);
// 		return Promise.reject(error);
// 	}
// );
