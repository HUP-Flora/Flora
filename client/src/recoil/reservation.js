import { atom } from "recoil";

export const RorderTypeState = atom({
	key: 'RorderTypeState',
	default: '',
});

export const RorderYearState = atom({
	key: 'RorderYearState',
	default: '',
});

export const RorderMonthState = atom({
	key: 'RorderMonthState',
	default: '',
});

export const RorderDayState = atom({
	key: 'RorderDayState',
	default: '',
});

export const RorderTimeState = atom({
	key: 'RorderTimeState',
	default: '',
});

export const RorderDayOfWeekState = atom({
	key: 'RorderDayOfWeekState',
	default: '',
});

export const RisModalShowState = atom({
	key: 'RisModalShowState',
	default: false,
});

// 가게 상세 들어가면 넣을 데이터
export const RstoreIdState = atom({
	key: 'RstoreIdState',
	default: '',
});

// 백엔드 요청에서 받을 데이터

// 휴무일(월, 화)
export const RorderHolidayState = atom({
	key: 'RorderHolidayState',
	default: '',
});

// 예약 시간 가능 여부 (객체? 배열?)
export const RorderTimeAvailableState = atom({
	key: 'RorderTimeAvailableState',
	default: '',
});




