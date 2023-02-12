import React from "react";

import StatusBar from "../../components/common/StatusBar";
import FloMarkList from "../../components/floMark/FloMarkList";
import { TabMenuBar } from "../../components/common/TabMenuBar";
import NoPaddingStatusBar from "../../components/common/NoPaddingStatusBar";

function FloMark(props) {
	return (
		<div>
			<NoPaddingStatusBar text="꽃갈피 목록" />
			<FloMarkList />
			<TabMenuBar selectedMenu="FloMark" />
		</div>
	);
}

export default FloMark;
