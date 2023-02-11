import { useSetRecoilState } from "recoil";
import { resultAddressListState } from "../recoil/search";
import api from "../utils/api";

export const useSearchAddressApi = () => {
	const setResultSearchAddressList = useSetRecoilState(resultAddressListState);

	const searchAddressApi = words => {
		api({
			method: "GET",
			url: `/stores/regions?word=${words}`,
		})
			.then(response => {
				const addressResultList = response.data.content.map(el => {
					return el.region;
				});
				setResultSearchAddressList(addressResultList);
			})
			.catch(error => {
				console.log("검색자동완성", error);
			});
	};

	return searchAddressApi;
};
