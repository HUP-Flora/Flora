import api from "../utils/api";

import { useRecoilValue, useSetRecoilState } from "recoil";
import {
	isNicknameValidState,
	isEditState,
	userState,
	MyPageNicknameState,
	MyPagePhoneNumberState,
} from "../recoil/mypage";

export const useUserInfoEditApi = () => {
	const myPageNickname = useRecoilValue(MyPageNicknameState);
	const myPagePhoneNumber = useRecoilValue(MyPagePhoneNumberState);
	const setIsNicknameValid = useSetRecoilState(isNicknameValidState);
	const setIsEdit = useSetRecoilState(isEditState);
	const setUser = useSetRecoilState(userState);

	const userInfoEditApi = () => {
		api({
			method: "PUT",
			url: `/users`,
			data: {
				nickname: myPageNickname,
				phoneNumber: myPagePhoneNumber,
			},
		})
			.then(res => {
				setIsNicknameValid(true);
				setIsEdit(false);
				setUser({ nickname: myPageNickname, phoneNumber: myPagePhoneNumber });
			})
			.catch(error => {
				console.log("유저 닉네임 수정 에러 ", error);
			});
	};

	return userInfoEditApi;
};
