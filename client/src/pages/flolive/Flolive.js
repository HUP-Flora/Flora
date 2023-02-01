import React from "react";

import OpenVidu from "../../components/flolive/openVidu/OpenViduVideo";
import registerServiceWorker from "../../components/flolive/openVidu/registerServiceWorker";

function Flolive(props) {
	registerServiceWorker();

	return (
		<>
			<OpenVidu />
		</>
	);
}

export default Flolive;
