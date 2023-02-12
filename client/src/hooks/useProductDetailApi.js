import api from "../utils/api";

import { useRecoilState } from "recoil";
import { productState } from "../recoil/productForms";

import { priceComma } from "./priceComma";

export const useProductDetailApi = () => {
	const [product, setProduct] = useRecoilState(productState);

	const productDetail = async pId => {
		await api({
			method: "GET",
			url: `/products/${pId}`,
		})
			.then(response => {
				console.log(response.data);

				setProduct({
					...response.data,
					price: priceComma(response.data.price)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productDetail;
};
