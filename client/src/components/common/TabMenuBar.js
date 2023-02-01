import { TabBarDiv, TabImg, TabMenu, TabText } from "../../styles/bar/BarStyle";

export function TabMenuBar({ isOwner, selectedMenu }) {
	const tabMenu = ["Main", "FloLive", "FloMark", "MyPage"];
	const tabMenuName = ["메인", "플로라이브", "꽃갈피", "내 정보"];

	if (isOwner) {
		tabMenu[2] = "MyStore";
		tabMenuName[2] = "내 가게";
	}

	return (
		<TabBarDiv>
			{tabMenu.map((menu, index) => (
				<TabMenu key={menu} isSelected={menu === selectedMenu}>
					<TabImg
						src={require(`../../assets/tapIcon/${
							menu === selectedMenu ? "Selected" : ""
						}${menu}.png`)}
						alt={menu}
					/>
					<TabText>{tabMenuName[index]}</TabText>
				</TabMenu>
			))}
		</TabBarDiv>
	);
}
