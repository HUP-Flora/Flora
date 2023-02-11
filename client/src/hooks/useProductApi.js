import api from "../utils/api";
import { useNavigate } from "react-router-dom";

import { useRecoilState, useSetRecoilState } from "recoil";
import { productState } from "../recoil/productForms";

export const useProductDetailApi = () => {
	const [product, setProduct] = useRecoilState(productState);

	const productDetail = () => {
		api({
			method: "GET",
			url: "/product",
		})
			.then(response => {
				console.log(response.data);
				setProduct(response.data);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productDetail;
};

export const useProductAddApi = () => {
	const navigate = useNavigate();

	const productAdd = (name, price, description) => {
		api({
			method: "POST",
			url: "/product",
			data: {
				productReq: {
					name: name,
					desc: description,
					price: price,
				},
			},
		})
			.then(response => {
				console.log(response);
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

	const productEdit = (pId, name, price, description) => {
		api({
			method: "PUT",
			url: `/product/${pId}`,
			data: {
				productReq: {
					name: name,
					desc: description,
					price: price,
				},
			},
		})
			.then(response => {
				console.log(response);
				navigate(`/product/:${pId}`);
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
				console.log(response);
				navigate(`/store/${sId}/detail`);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productDelete;
};
