import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export const useProductDeleteApi = () => {
	const navigate = useNavigate();

	const productDelete = (sId, pId) => {
		api({
			method: "DELETE",
			url: `/products/${pId}`,
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
