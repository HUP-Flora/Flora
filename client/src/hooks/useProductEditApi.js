import api from "../utils/api";
import { useNavigate } from "react-router-dom";

import { useResetRecoilState } from "recoil";
import { productState } from "../recoil/productForms";
import { storeImageFileState } from "../recoil/signup";

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
				// navigate(`/store/${sId}/product/${pId}`);
				navigate(-1);
			})
			.catch(error => {
				console.log(error);
			});
	};

	return productEdit;
};
