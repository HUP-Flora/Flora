import React, { useState } from "react";

import OpenVidu from "../../components/floliveTest/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/floliveTest/openVidu/registerServiceWorker";
import Chat from "../../components/chattingTest/Chatting";
import ModalContainer from "../../components/floliveTest/openVidu/OpenViduExitModal";

function Flolive(props) {
	const [isModalShow, setIsModalShow] = useState(false);

	registerServiceWorker();

	return (
		<div style={{ height: "100vh" }}>
			<OpenVidu isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
			<Chat />
			{isModalShow && <ModalContainer isModalShow={isModalShow} setIsModalShow={setIsModalShow} />}
		</div>
	);
}

export default Flolive;
