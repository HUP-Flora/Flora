import api from "../utils/api";

import { useRecoilValue, useSetRecoilState } from "recoil";
import { isNicknameValidState, isEditState, userState } from "../recoil/mypage";

export const useUserInfoEditApi = () => {
	const user = useRecoilValue(userState);
	const setIsNicknameValid = useSetRecoilState(isNicknameValidState);
	const setIsEdit = useSetRecoilState(isEditState);

	const userInfoEditApi = () => {
		api({
			method: "PUT",
			url: `/users`,
			data: {
				nickname: user.user.nickname,
				phoneNumber: user.user.phoneNumber,
			},
		})
			.then(res => {
				console.log(res);
				setIsNicknameValid(true);
				setIsEdit(false);
			})
			.catch(error => {
				console.log("유저 닉네임 수정 에러 ", error);
			});
	};

	return userInfoEditApi;
};
