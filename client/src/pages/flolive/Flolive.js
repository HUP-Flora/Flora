import React from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";

function Flolive(props) {
	registerServiceWorker();

	return (
		<div style={{ height: "100vh" }}>
			<OpenVidu />
		</div>
	);
}

export default Flolive;
