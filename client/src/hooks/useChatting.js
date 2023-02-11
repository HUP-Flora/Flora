import api from "../utils/api";

function useChatting() {
	const sendFormDataAPI = orederFormData => {
		api({
			method: "POST",
			url: "flolive/1/receipt",
			orederFormData,
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return {
		sendFormDataAPI,
	}
}

export default useChatting;
