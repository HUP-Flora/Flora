import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	phoneNumberState,
	storeBrnState,
	storeDescriptionState,
	storeEndTimeState,
	storeHolidayState,
	storeImageFileState,
	storeNameState,
	storeSecondAddressState,
	storeStartTimeState,
} from "../recoil/signup";
import { ownersIdState } from "../recoil/userInfo";
import api from "../utils/api";
import { useGetUserTypeApi } from "./useGetUserTypeApi";

export const useStoreFormApi = () => {
	const setStorePhoneNumber = useSetRecoilState(phoneNumberState);
	const setStoreName = useSetRecoilState(storeNameState);
	const setStoreDescription = useSetRecoilState(storeDescriptionState);
	const setStoreSecondAddress = useSetRecoilState(storeSecondAddressState);
	const setStoreEndTime = useSetRecoilState(storeEndTimeState);
	const setStoreHoliday = useSetRecoilState(storeHolidayState);
	const setStoreStartTime = useSetRecoilState(storeStartTimeState);
	const setStoreBrn = useSetRecoilState(storeBrnState);
	const setStoreImageFile = useSetRecoilState(storeImageFileState);
	const getUserTypeApi = useGetUserTypeApi();
	const ownersId = useRecoilValue(ownersIdState);

	const navigate = useNavigate();

	const storeFormApi = (data, nextURL) => {
		api({
			method: "PUT",
			url: nextURL === "/" ? "/auth/stores" : "/stores",
			headers: {
				"Content-Type": "multipart/form-data",
			},
			data,
		})
			.then(res => {
				if (nextURL !== -1) {
					localStorage.setItem("AccessToken", res.data);

					getUserTypeApi(res.data);
				}
				setStoreImageFile("");
				setStoreBrn("");
				setStoreName("");
				setStorePhoneNumber("");
				setStoreSecondAddress("");
				setStoreDescription("");
				setStoreHoliday([false, false, false, false, false, false, false]);
				setStoreStartTime({ value: 18, label: "09:00" });
				setStoreEndTime({ value: 36, label: "18:00" });
				navigate(`/store/${ownersId}`);
			})
			.catch(err => {
				console.log(err);
			});
	};

	// storeFormApi();

	// const storeFormApi = data => {
	// 	axios({
	// 		method: "PUT",
	// 		url: `${process.env.REACT_APP_SERVER_URL}/auth/stores`,
	// 		headers: {
	// 			Authorization: `Bearer ${token}`,
	// 			"Content-Type": "application/json",
	// 		},
	// 		data,
	// 	})
	// 		.then(response => {
	// 			console.log(response);
	// 		})
	// 		.catch(error => {
	// 			console.log(error);
	// 		});
	// };

	return storeFormApi;
};
