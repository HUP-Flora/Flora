import api from "../utils/api";

import { useSetRecoilState } from "recoil";
import { isNicknameValidState, isNicknameEditState } from "../recoil/mypage";

export const useNicknameEditApi = () => {
	const setIsNicknameValid = useSetRecoilState(isNicknameValidState);
	const setIsNicknameEdit = useSetRecoilState(isNicknameEditState);

	const nicknameEditApi = nickname => {
		api({
			method: "PUT",
			url: `/users/nickname`,
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
