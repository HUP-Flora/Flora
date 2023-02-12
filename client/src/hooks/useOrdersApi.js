import api from "../utils/api";

import { useRecoilState } from "recoil";
import { ordersState } from "../recoil/order";

export const useOrdersApi = () => {
	const [orders, setOrders] = useRecoilState(ordersState);

	const oredersApi = (type, size) => {
		let url = "";

		if (type === "customer") {
			url = `/orders/users?page=&size=${size}`;
		} else {
			url = `/orders/stores?page=&size=${size}`;
		}
		api({
			method: "GET",
			url: url,
		})
			.then(response => {
				console.log(response.data.content);
				setOrders(response.data.content);
			})
			.catch(error => {
				console.log("주문 내역 에러", error);
			});
	};
	return oredersApi;
};
