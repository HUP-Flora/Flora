import api from "../utils/api";

export const useKakaoPaymentApi = (data, orderId) => {
	api({
		method: "POST",
		url: `/pay/${orderId}`,
		data,
	})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
			console.log(error);
		});
};
