import api from "../utils/api";

import { useRecoilState } from "recoil";
import { productsState } from "../recoil/storeDetail";

export const useProductsApi = () => {
	const [products, setProducts] = useRecoilState(productsState);

	const productsApi = async sId => {
		await api({
			method: "GET",
			url: `/stores/${sId}/products?page=0&size=100`,
		})
			.then(response => {
				setProducts(response.data.content);
			})
			.catch(error => console.log("상품 정보 에러", error));
	};

	return productsApi;
};
