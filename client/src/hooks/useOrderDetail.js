import api from "../utils/api";

function useOrderDetail() {
	const changeOrderStatusAPI = (oId) => {
		api({
			method: "PUT",
			url: `orders/changestatus/${oId}`,
		})
			.then(res => {
				console.log("주문상태바꾸기api성공", res);
			})
			.catch(err => {
				console.log("주문상태바꾸기api에러", err);
			});
	}
	return {
		changeOrderStatusAPI,
	}
}

export default useOrderDetail;