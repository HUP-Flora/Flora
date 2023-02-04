import React from "react";

import { TabTitlesContainer, TabTitle } from "../../styles/common/DoubleTabsStyle";

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
				</div>
				<div>
					<TabTitle
						active={isDefaultTabActive ? false : true}
						onClick={() => handleClickDefaultTab(false)}
					>
						{otherTabTitle}
					</TabTitle>
				</div>
			</TabTitlesContainer>
		</>
	);
}

export default DoubleTabs;
