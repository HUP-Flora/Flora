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
				console.log(response.data.content);
				setOrders(response.data.content);
			})
			.catch(error => {
				console.log("주문 내역 에러", error);
			});
	};

	const getOrderDetail = oId => {
		api({
			method: "GET",
			url: `/orders/${oId}`,
		})
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};
	return { oredersApi, getOrderDetail };
};
