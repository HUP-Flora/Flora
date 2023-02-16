export const decideTitle = (orderStatus, orderType, user) => {
	let titleText;
	let subTitleText;

	if (orderStatus === "결제 전") {
		titleText = `꽃 결제가 완료되지<br />
						않았습니다.`;
		if (user === "사장") {
			subTitleText = `고객님이 상품 결제를 하지 않았습니다.<br />no - show로 의심된다면 신고해주세요.`;
		} else if (user === "손님") {
			subTitleText = "다시 한 번 결제 시도해주세요."
		}
	} else if (orderStatus === "결제 완료") {
		titleText = "꽃 결제가 완료되었어요.";
		if (user === "사장") {
			subTitleText = "고객님이 상품 결제를 완료하셨어요.<br />배송 후에 배송 상태를 변경해주세요!";
			if (orderType === "픽업") {
				subTitleText = "고객님이 상품 결제를 완료하셨어요.<br />고객님이 수령을 완료하면 상태를 변경해주세요!";
			}
		} else if (user === "손님") {
			subTitleText = "선택하신 날짜에 맞춰 배송이 시작될 예정이에요."
			if (orderType === "픽업") {
				subTitleText = "선택하신 날짜에 맞춰 준비가 완료될 예정이에요."
			}
		}
	} else if (orderStatus === "배송 중") {
		titleText = "꽃이 배송되고 있어요.";
		if (user === "사장") {
			subTitleText = "안전하게 전달된 예정이에요.<br />배송이 완료되면 배송 상태를 변경해주세요!";
			if (orderType === "픽업") {
				subTitleText = "고객님이 수령을 완료하면 상태를 변경해주세요!";
			}
		} else if (user === "손님") {
			subTitleText = "곧 안전하게 전달될 예정이에요."
		}
	} else if (orderStatus === "배송 완료" || orderStatus === "수령 완료") {
		titleText = "꽃 배송이 완료되었어요.";
		if (orderType === "픽업") {
			titleText = "꽃 수령이 완료되었어요.";
		}
		if (user === "사장") {
			subTitleText = "꽃 전달이 완료되었어요!<br />고객님이 남기신 소중한 리뷰를 확인해주세요!";
		} else if (user === "손님") {
			subTitleText = "꽃이 전달되었어요! 소중한 리뷰를 작성해주세요."
		}
	}
	return { titleText, subTitleText };
}

export const decideLeftSize = (orderType, orderStatus) => {
	let leftSize;
	if (orderType === "배달") {
		if (orderStatus === "결제 완료") {
			leftSize = "57%";
		} else {
			leftSize = "86%";
		}
	} else if (orderType === "픽업") {
		if (orderStatus === "결제 완료") {
			leftSize = "86%";
		}
	}
	return leftSize;
}

export const decideProgressInfo = (orderType, orderStatus, setStates) => {
	if (orderType === "배달") {
		switch (orderStatus) {
			case "결제 전":
				setStates(true, false, false, false, "12%");
				break;
			case "결제 완료":
				setStates(false, true, false, false, "35%");
				break;
			case "배송 중":
				setStates(false, false, true, false, "65%");
				break;
			case "배송 완료":
				setStates(false, false, false, true, "100%");
				break;
			default:
				break;
		}
	} else if (orderType === "픽업") {
		switch (orderStatus) {
			case "결제 전":
				setStates(true, false, false, false, "12%");
				break;
			case "결제 완료":
				setStates(false, true, false, false, "50%");
				break;
			case "수령 완료":
				setStates(false, false, true, false, "100%");
				break;
			default:
				break;
		}
	}
}

export const decideOrderStatus = (status) => {
	let nowStatus;
	if (status === 0) {
		nowStatus = "결제 전";
	} else if (status === 1) {
		nowStatus = "결제 완료";
	} else if (status === 2) {
		nowStatus = "배송 중";
	} else if (status === 3) {
		nowStatus = "배송 완료";
	} else if (status === 5) {
		nowStatus = "수령 완료";
	}
	return nowStatus;
};