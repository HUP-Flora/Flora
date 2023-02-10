import axios from "axios";

export const mypageInfoApi = () => {
	const basicInfoApi = () => {
		axios({
			method: "GET",
			url: `${process.env.REACT_APP_SERVER_URL}/v1/users`,
			headers: {
				Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
			},
		})
			.then(response => {
				console.log(response);
			})
			.catch(error => {
				console.log("유저 기본 정보 에러", error);
			});
	};

	// return axios
	// 	.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users`, {
	// 		headers: {
	// 			Authorization: `Bearer ${localStorage.getItem("AccessToken")}`,
	// 		},
	// 	})
	// 	.then(res => {
	// 		console.log(res);
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	});

	console.log(basicInfoApi.data);

	return basicInfoApi;
};
