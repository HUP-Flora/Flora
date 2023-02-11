import { useNavigate } from "react-router-dom";

import { TabBarDiv, TabImg, TabMenu, TabText, TabImgWrapper } from "../../styles/bar/BarStyle";

export function TabMenuBar({ isOwner, selectedMenu }) {
	const navigate = useNavigate();

	const tabMenu = ["Main", "FloLive", "FloMark", "MyPage"];
	const tabMenuName = ["메인", "플로라이브", "꽃갈피", "내 정보"];
	const redirectPageList = ["/", "/reservation/list", "/flomark/list", "/mypage"];
	if (isOwner) {
		tabMenu[2] = "MyStore";
		tabMenuName[2] = "내 가게";
		redirectPageList[2] = `/store/${"storeId가 있어야함"}/detail`;
	}

	return (
		<TabBarDiv>
			{tabMenu.map((menu, index) => (
				<TabMenu
					key={menu}
					isSelected={menu === selectedMenu}
					onClick={() => navigate(redirectPageList[index])}
				>
					<TabImgWrapper>
						<TabImg
							src={require(`../../assets/tapIcon/${
								menu === selectedMenu ? "Selected" : ""
							}${menu}.png`)}
							alt={menu}
						/>
					</TabImgWrapper>
					<TabText>{tabMenuName[index]}</TabText>
				</TabMenu>
			))}
		</TabBarDiv>
	);
}
