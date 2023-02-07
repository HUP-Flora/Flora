import { useRecoilValue } from "recoil";
import { LmyNameState, LmySessionIdState } from "../recoil/flolive";

export const useFlolive = () => {
	return {
		Lname: useRecoilValue(LmyNameState),
		LsessionId: useRecoilValue(LmySessionIdState),
	}
}