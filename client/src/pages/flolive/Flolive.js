import React from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";
import Chat from "../../components/chatting/Chatting";

function Flolive(props) {
	registerServiceWorker();

	return (
		<>
			<div style={{ height: "100vh" }}>
				<OpenVidu />
				<Chat />
			</div>
		</>
	);
}

export default Flolive;
