import api from "../utils/api";

import { useSetRecoilState } from "recoil";
import {
	userState,
	isNicknameValidState,
	isPhoneNumberValidState,
	isNicknameEditState,
	isPhoneNumberEditState,
} from "../recoil/mypage";

export const useInfoApi = () => {
	const setUser = useSetRecoilState(userState);

	const infoApi = (type, sId) => {
		let url = "";

		if (type === "customer") {
			url = `/users`;
		} else {
			url = `/stores/${sId}/mypage`;
		}

		api({
			method: "GET",
			url: url,
		})
			.then(res => {
				console.log(res.data);

				setUser(res.data);
			})
			.catch(error => {
				console.log("유저 기본 정보 에러", error);
			});
	};

	return infoApi;
};

export const useNicknameEditApi = () => {
	const setIsNicknameValid = useSetRecoilState(isNicknameValidState);
	const setIsNicknameEdit = useSetRecoilState(isNicknameEditState);

	const nicknameEditApi = nickname => {
		api({
			method: "PUT",
			url: `/users`,
			data: {
				nickname: nickname,
			},
		})
			.then(res => {
				console.log(res);
				setIsNicknameValid(true);
				setIsNicknameEdit(false);
			})
			.catch(error => {
				console.log("유저 닉네임 수정 에러 ", error);
			});
	};

	return nicknameEditApi;
};

export const usePhoneNumberEditApi = () => {
	const setIsPhoneNumberValid = useSetRecoilState(isPhoneNumberValidState);
	const setIsPhoneNumberEdit = useSetRecoilState(isPhoneNumberEditState);

	const phoneNumberEditApi = phoneNumber => {
		api({
			method: "PUT",
			url: `/users`,
			data: {
				phoneNumber: phoneNumber,
			},
		})
			.then(res => {
				console.log(res);
				setIsPhoneNumberValid(true);
				setIsPhoneNumberEdit(false);
			})
			.catch(error => {
				console.log("유저 닉네임 수정 에러 ", error);
			});
	};

	return phoneNumberEditApi;
};

export const useLogoutApi = () => {
	const logoutApi = () => {
		api({
			method: "GET",
			url: `/auth`,
		})
			.then(res => {
				console.log(res);
			})
			.catch(error => {
				console.log("로그아웃 에러", error);
			});
	};

	return logoutApi;
};
