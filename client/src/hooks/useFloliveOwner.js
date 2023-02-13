import api from "../utils/api";
import { useNavigate } from "react-router-dom";

function useFloliveOwner() {
	const navigate = useNavigate();

	const acceptFlolive = (oId) => {
		api({
			method: "GET",
			url: `/flolive/${oId}`,
		})
			.then(res => {
				console.log(res);
				const sessionId = res.data.sessionId;
				// const OPENVIDU_TOKEN = res.data.connectionToken;
				navigate(`/flolive/${oId}/${sessionId}`);
			})
			.catch(err => {
				console.log("사장 수락 에러", err);
			});
	};

	return {
		accepteFlolive: acceptFlolive,
	};
}

export default useFloliveOwner;