import { useParams } from "react-router-dom";
import api from "../utils/api";

function useChattingAPI() {
	const sendFormDataAPI = (data, oId) => {
		api({
			method: "POST",
			url: `flolive/${oId}/receipt`,
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
	};
}

export default useChattingAPI;
