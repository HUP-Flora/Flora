import api from "../utils/api";

import { useRecoilState } from "recoil";
import { ordersState } from "../recoil/order";
import { useNavigate } from "react-router-dom";
import { orderDetailState } from "../recoil/orderDetail";
import { useCallback } from "react";

export const useOrdersApi = () => {
	const [orders, setOrders] = useRecoilState(ordersState);
	const [orderDetail, setOrderDetail] = useRecoilState(orderDetailState);

	const ordersApi = type => {
		let url = "";

		if (type === "CUSTOMER") {
			url = `/orders/users`;
			// url = `/orders/users?page=&size=${size}`;
		} else {
			url = `/orders/stores`;
			// url = `/orders/stores?page=&size=${size}`;
		}
		api({
			method: "GET",
			url: url,
		})
			.then(response => {
				setOrders(response.data.content);
			})
			.catch(error => {
				console.log("주문 내역 에러", error);
			});
	};

	const getOrderDetail = useCallback(
		oId => {
			api({
				method: "GET",
				url: `/orders/${oId}`,
			})
				.then(res => {
					console.log(res.data);
					setOrderDetail(res.data);
				})
				.catch(err => {
					console.log(err);
				});
		},
		[setOrderDetail]
	);

	return { ordersApi, getOrderDetail };
};
