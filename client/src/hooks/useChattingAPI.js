import api from "../utils/api";

function useChattingAPI() {
	const sendFormDataAPI = data => {
		api({
			method: "POST",
			url: "flolive/1/receipt",
			data,
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

export default useChattingAPI;
