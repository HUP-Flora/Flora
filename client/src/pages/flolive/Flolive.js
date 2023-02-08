import React, { useState } from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";
import Chat from "../../components/chatting/Chatting";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";
import { useRecoilValue } from "recoil";
import ModalContainer from "../../components/flolive/openVidu/OpenViduExitModal";

function Flolive() {
	const [isModalShow, setIsModalShow] = useState(false);

	const LmyType = useRecoilValue(LmyTypeState);
	const LmySessionId = useRecoilValue(LmySessionIdState);

	registerServiceWorker();

	return (
		<>
			<div style={{ height: "100vh" }}>
				<OpenVidu
					LmyType={LmyType}
					LmySessionId={LmySessionId}
					isModalShow={isModalShow}
					setIsModalShow={setIsModalShow}
				/>
				<Chat />
				{isModalShow && (
					<ModalContainer isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
				)}
			</div>
		</>
	);
}

export default Flolive;
