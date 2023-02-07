import React from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";
import Chat from "../../components/chatting/Chatting";
import { LmySessionIdState, LmyTypeState } from "../../recoil/flolive";
import { useRecoilValue } from "recoil";

function Flolive() {
	const LmyType = useRecoilValue(LmyTypeState);
	const LmySessionId = useRecoilValue(LmySessionIdState);

	registerServiceWorker();

	return (
		<>
			<div style={{ height: "100vh" }}>
				<OpenVidu LmyType={LmyType} LmySessionId={LmySessionId} />
				<Chat />
			</div>
		</>
	);
}

export default Flolive;
