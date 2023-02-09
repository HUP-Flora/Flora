import axios from "axios";

const BASE_URL = process.env.REACT_APP_SERVER_URL;

const api = axios.create({
	url: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	}
})

api.interceptors.request.use(function(config) {
	const ACCESS_TOKEN = localStorage.getItem("AccessToken");
	if (!ACCESS_TOKEN) {
		window.location.href = "/login";
	}

	config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;

	return config;
});

export default api;