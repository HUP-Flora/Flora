import React, { useEffect, useState } from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";
import Chat from "../../components/chatting/Chatting";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";
import { useRecoilValue } from "recoil";
import ModalContainer from "../../components/flolive/openVidu/OpenViduExitModal";
import { userInfoTypeState } from "../../recoil/userInfo";
import { userType } from "../../utils/user";
import { useParams } from "react-router-dom";
import { useReservationAcceptApi } from "../../hooks/useReservationAcceptApi";
import { useFloliveExitApi } from "../../hooks/useFloliveExitApi";

function Flolive() {
	const [isModalShow, setIsModalShow] = useState(false);
	// const { reservationAcceptApi } = useReservationAcceptApi();
	// const { floliveExitApi } = useFloliveExitApi();

	// 이게 유저 name으로 사용할 유저 타입
	const myType = userType();
	// 이게 url에서 따온 세션 아이디
	const mySessionId = useParams().conId;
	// const oId = useParams().oId;

	registerServiceWorker();

	// useEffect(() => {
	// 	reservationAcceptApi(oId);
	// 	return function cleanup() {
	// 		floliveExitApi(oId);
	// 	};
	// }, []);

	return (
		<>
			<div style={{ height: "100vh" }}>
				<OpenVidu
					userType={userType}
					// myType과 mySessionId을 props로 넘겨줌
					myType={myType === "사장" ? "owner" : "customer"}
					mySessionId={mySessionId}
					isModalShow={isModalShow}
					setIsModalShow={setIsModalShow}
				/>
				<Chat myType={myType} mySessionId={mySessionId} />
				{isModalShow && (
					<ModalContainer isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
				)}
			</div>
		</>
	);
}

export default Flolive;
