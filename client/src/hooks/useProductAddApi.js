import api from "../utils/api";
import { useNavigate } from "react-router-dom";

import { useResetRecoilState } from "recoil";
import { productState } from "../recoil/productForms";
import { storeImageFileState } from "../recoil/signup";

export const useProductAddApi = () => {
	const navigate = useNavigate();
	const resetProduct = useResetRecoilState(productState);
	const resetProductImg = useResetRecoilState(storeImageFileState);

	const productAdd = (sId, data) => {
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
				navigate(`/store/${sId}/product/${response.data}`);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productAdd;
};
