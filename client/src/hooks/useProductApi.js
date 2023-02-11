import api from "../utils/api";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { productState } from "../recoil/productForms";
import { storeImageFileState } from "../recoil/signup";

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

export const useProductAddApi = () => {
	const navigate = useNavigate();
	const resetProduct = useResetRecoilState(productState);
	const resetProductImg = useResetRecoilState(storeImageFileState);

	const productAdd = data => {
		api({
			method: "POST",
			url: "/products",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data,
		})
			.then(response => {
				resetProduct();
				resetProductImg();
				navigate("/productDetail");
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productAdd;
};

export const useProductEditApi = () => {
	const navigate = useNavigate();
	const resetProduct = useResetRecoilState(productState);
	const resetProductImg = useResetRecoilState(storeImageFileState);

	const productEdit = (sId, pId, data) => {
		api({
			method: "PUT",
			url: `/products/${pId}`,
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data,
		})
			.then(response => {
				resetProduct();
				resetProductImg();
				navigate(`/store/${sId}/product/${pId}`);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productEdit;
};

export const useProductDeleteApi = () => {
	const navigate = useNavigate();

	const productDelete = (sId, pId) => {
		api({
			method: "DELETE",
			url: `/product/${pId}`,
		})
			.then(response => {
				navigate(`/store/${sId}`);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productDelete;
};
