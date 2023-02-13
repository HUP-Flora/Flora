import api from "../utils/api";

import { useRecoilState, useSetRecoilState } from "recoil";
import { productState } from "../recoil/productForms";

import { priceComma } from "./priceComma";
import { storeImagePreviewState } from "../recoil/signup";

export const useProductDetailApi = () => {
	const [product, setProduct] = useRecoilState(productState);
	const setImagePreview = useSetRecoilState(storeImagePreviewState);

	const productDetail = async pId => {
		await api({
			method: "GET",
			url: `/products/${pId}`,
		})
			.then(response => {
				console.log(response.data);
				setProduct({
					...response.data,
					// desc: response.data.desc.replace(/\n/g, `${&#10;}`),
					price: priceComma(response.data.price)
						.toString()
						.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
				});
				console.log(response.data.pimg);
				setImagePreview(response.data.pimg);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productDetail;
};
