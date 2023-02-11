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

	const infoApi = () => {
		api({
			method: "GET",
			url: `/users`,
		})
			.then(res => {
				// console.log(res);
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
