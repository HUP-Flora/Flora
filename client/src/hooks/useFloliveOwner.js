import api from "../utils/api";

function useFloliveOwner() {
	const accepteFlolive = () => {
		api({
			method: "GET",
			// url: `/flolive/${oId}`,
			url: "/flolive/69",
		})
			.then(res => {
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	}

	return {
		accepteFlolive,
	}
}

export default useFloliveOwner;