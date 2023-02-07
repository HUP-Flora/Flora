import React from "react";

import OpenVidu from "../../components/floliveTest/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/floliveTest/openVidu/registerServiceWorker";
import Chat from "../../components/chattingTest/Chatting";

function Flolive(props) {
	registerServiceWorker();

	return (
		<div style={{ height: "100vh" }}>
			<OpenVidu />
			<Chat />
		</div>
	);
}

export default Flolive;
