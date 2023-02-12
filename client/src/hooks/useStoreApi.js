import api from "../utils/api";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
	storeState,
	isFloMarkClickedState,
	productsState,
	reviewsState,
} from "../recoil/storeDetail";

export const useStoreInfoApi = () => {
	const setStore = useSetRecoilState(storeState);

	const storeInfo = sId => {
		api({
			method: "GET",
			url: `/stores/${sId}`,
		})
			.then(response => {
				console.log(response.data);
				setStore(response.data);
			})
			.catch(error => console.log("가게 정보 에러", error));
	};

	return storeInfo;
};

export const useToggleApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const toggle = async sId => {
		await api({
			method: "POST",
			url: `/stores/${sId}/onair`,
		})
			.then(() => {
				setStore({ ...store, isOnair: store.isOnair === "ON" ? "OFF" : "ON" });
			})
			.catch(error => {
				console.log("온오프 토글 에러", error);
			});
	};

	return toggle;
};

export const useIsFloMarkApi = () => {
	const [isFloMarkClicked, setIsFloMarkClicked] = useRecoilState(isFloMarkClickedState);

	const isFloMark = async sId => {
		await api({
			method: "GET",
			url: `/flowermarks/${sId}`,
		})
			.then(response => {
				setIsFloMarkClicked(response.data);
			})
			.catch(error => {
				console.log("꽃갈피 여부 에러", error);
			});
	};

	return isFloMark;
};

export const useFloMarkAddApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const floMarkAdd = async sId => {
		await api({
			method: "POST",
			url: `/flowermarks/${sId}`,
		})
			.then(sId => {
				setStore({
					...store,
					bookmarkCnt: store?.bookmarkCnt + 1,
				});
			})
			.catch(error => {
				console.log("꽃갈피 추가 에러", error);
			});
	};

	return floMarkAdd;
};

export const useFloMarkDeleteApi = () => {
	const [store, setStore] = useRecoilState(storeState);

	const floMarkDelete = async sId => {
		await api({
			method: "DELETE",
			url: `/flowermarks/${sId}`,
		})
			.then(sId => {
				setStore({
					...store,
					bookmarkCnt: store?.bookmarkCnt - 1,
				});
			})
			.catch(error => {
				console.log("꽃갈피 삭제 에러", error);
			});
	};

	return floMarkDelete;
};

export const useProductsApi = () => {
	const [products, setProducts] = useRecoilState(productsState);

	const productsApi = async sId => {
		await api({
			method: "GET",
			url: `/stores/${sId}/products?page=0&size=5`,
		})
			.then(response => {
				setProducts(response.data.content);
			})
			.catch(error => console.log("상품 정보 에러", error));
	};

	return productsApi;
};

export const useReviewsApi = () => {
	const [reviews, setReviews] = useRecoilState(reviewsState);

	const reviewsApi = async sId => {
		await api({
			method: "GET",
			url: `/reviews/stores/${sId}?page=&size=`,
		})
			.then(response => {
				setReviews(response.data.content);
			})
			.catch(error => console.log("리뷰 정보 에러", error));
	};

	return reviewsApi;
};
