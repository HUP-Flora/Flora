import React from "react";

import {
	DeleteInfoContainer,
	DetailInfoWrapper,
	ValidTextWrapper,
} from "../../styles/myPage/UserDeleteInfoStyle";
import { BoldText, ValidText, Primary400CheckBox } from "../../styles/common/CommonStyle";

function UserDeleteInfo({ isChcked, setIsChcked, isValid }) {
	const handleChangeCheck = e => {
		setIsChcked(!isChcked);
	};

	return (
		<DeleteInfoContainer>
			<BoldText size="19" font="nexon">
				회원탈퇴 시 <br />
				유의사항을 다시 한 번 확인해주세요.
			</BoldText>
			<DetailInfoWrapper>
				<ul>
					<li>탈퇴 시 고객님의 이용내역이 즉시 삭제되며 복구할 수 없습니다.</li>
					<li>
						탈퇴 시 고객님의 정보는 전자상거래 등에서의 소비자 보호에 관한 법류에 의거한 고객정보
						보호정책에 따라 관리됩니다.
					</li>
				</ul>
			</DetailInfoWrapper>
			<div>
				<Primary400CheckBox
					type="checkbox"
					id="checkbox"
					onChange={e => handleChangeCheck(e)}
					checked={isChcked}
				/>
				<BoldText font="nexon">
					<label for="checkbox">유의사항을 모두 확인했으며, 이에 동의합니다.</label>
				</BoldText>
			</div>
			<ValidTextWrapper>
				{!isValid && <ValidText>탈퇴를 원하신다면 체크해주세요.</ValidText>}
			</ValidTextWrapper>
		</DeleteInfoContainer>
	);
}

export default UserDeleteInfo;
