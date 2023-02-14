import api from "../utils/api";

import { useSetRecoilState } from "recoil";
// import { isPhoneNumberValidState, isPhoneNumberEditState } from "../recoil/mypage";

export const usePhoneNumberEditApi = () => {
	// const setIsPhoneNumberValid = useSetRecoilState(isPhoneNumberValidState);
	// const setIsPhoneNumberEdit = useSetRecoilState(isPhoneNumberEditState);

	const phoneNumberEditApi = phoneNumber => {
		api({
			method: "PUT",
			url: `/users/phonenumber`,
			data: {
				phoneNumber: phoneNumber,
			},
		})
			.then(res => {
				console.log(res);
				// setIsPhoneNumberValid(true);
				// setIsPhoneNumberEdit(false);
			})
			.catch(error => {
				console.log("유저 전화번호 수정 에러 ", error);
			});
	};

	return phoneNumberEditApi;
};
