import { useSetRecoilState } from "recoil";
import { OrderSuccessDataState } from "../recoil/flolive";
import api from "../utils/api";

export const useLoadOrderDataApi = () => {
	const setOrderSuccessData = useSetRecoilState(OrderSuccessDataState);

	const loadOrderDataApi = oId => {
		api({
			method: "GET",
			url: `/pay/${oId}/success`,
		})
			.then(response => {
				console.log(response);
				setOrderSuccessData(response.data);
			})
			.catch(error => {
				console.log("결제 완료 에러", error);
			});
	};

	return loadOrderDataApi;
};
