import api from "../utils/api";

import { useRecoilState } from "recoil";
import { ordersState } from "../recoil/order";

export const useOrdersApi = () => {
	const [orders, setOrders] = useRecoilState(ordersState);

	const oredersApi = size => {
		api({
			method: "GET",
			url: `/orders/users?page=0&size=${size}`,
		})
			.then(response => {
				console.log(response.data);
				setOrders(response.data);
			})
			.catch(error => {
				console.log("주문 내역 에러", error);
			});
	};
	return oredersApi;
};
