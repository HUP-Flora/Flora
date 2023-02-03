import React from "react";

import {
	TabTitlesContainer,
	TabTitle,
	TabHrWrapper,
	TabHr,
} from "../../styles/common/DoubleTabsStyle";

function DoubleTabs({ isDefaultTabActive, setIsDefaultTabActive, defaultTabTitle, otherTabTitle }) {
	const handleClickDefaultTab = isDefault => {
		isDefault ? setIsDefaultTabActive(true) : setIsDefaultTabActive(false);
	};

	return (
		<>
			<TabTitlesContainer>
				<div>
					<TabTitle
						active={isDefaultTabActive ? true : false}
						onClick={() => handleClickDefaultTab(true)}
					>
						{defaultTabTitle}
					</TabTitle>
					<TabHr active={isDefaultTabActive ? true : false} />
				</div>
				<div>
					<TabTitle
						active={isDefaultTabActive ? false : true}
						onClick={() => handleClickDefaultTab(false)}
					>
						{otherTabTitle}
					</TabTitle>
					<TabHr active={isDefaultTabActive ? false : true} />
				</div>
			</TabTitlesContainer>
			{/* <TabHrWrapper> */}
			{/* <TabHr /> */}
			{/* <TabHr /> */}
			{/* </TabHrWrapper> */}
		</>
	);
}

export default DoubleTabs;
