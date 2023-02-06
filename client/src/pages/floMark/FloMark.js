import React from "react";

import StatusBar from "../../components/common/StatusBar";
import FloMarkList from "../../components/floMark/FloMarkList";
import { TabMenuBar } from "../../components/common/TabMenuBar";

function FloMark(props) {
	return (
		<div>
			<StatusBar text="꽃갈피 목록" />
			<FloMarkList />
			<TabMenuBar selectedMenu="FloMark" />
		</div>
	);
}

export default FloMark;
