import {
	LmySessionIdState,
	LmyTypeState,
	LliveStatusState,
	LorderNumberState,
} from "../recoil/flolive";
import { useRecoilState, useSetRecoilState } from "recoil";
import api from "../utils/api";
import { RstoreIdState } from "../recoil/reservation";

function useStoreDetail() {
	const setLmyType = useSetRecoilState(LmyTypeState);
	const setLmySessionId = useSetRecoilState(LmySessionIdState);
	const [LiveStatus, setLiveStatus] = useRecoilState(LliveStatusState);
	const setLorderNumber = useSetRecoilState(LorderNumberState);
	const [RstoreId, setRstoreId] = useRecoilState(RstoreIdState);

	const enterFloliveAPI = () => {
		api({
			url: `/flolive/${RstoreId}`,
			method: "POST",
		})
			.then(res => {
				// console.log(res.data);
				// 응답으로 온 오더아이디를 저장
				setLorderNumber(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	const checkLiveStatusAPI = (LorderNumber, LliveStatus) => {
		api({
			url: `/flolive/res/${LorderNumber}`,
			method: "GET",
		})
			.then(res => {
				console.log(res);
				// 처음 요청해서 받은 오더아이드를 통해 라이브 상태를 확인
				setLiveStatus(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	};

	return {
		enterFloliveAPI,
		checkLiveStatusAPI,
	};
}

export default useStoreDetail;
