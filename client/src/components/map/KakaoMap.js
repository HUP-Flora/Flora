import { useEffect } from "react";
import { Map } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { levelState, locationState } from "../../recoil/map";
import { MapStyle } from "../../styles/map/MapStyle";

export function KakaoMap() {
	const [position, setPosition] = useRecoilState(locationState);
	const [level, setLevel] = useRecoilState(levelState);

	// 임시로 좌표 지정 - 추후 삭제
	useEffect(() => {
		setPosition({ center: { lat: 33.452613, lng: 126.570888 }, isPanto: false });
	}, []);

	const handlePosition = (lat, lng, isPanto) => {
		setPosition({
			center: { lat: lat, lng: lng },
			isPanto: isPanto,
		});
	};

	const handleSearch = () => {
		// 1. axios로 위도 경도 데이터 받기
		// 2. position 변경
		handlePosition(33.452613, 126.570888, false);
	};

	return (
		<Map // 지도를 표시할 Container
			center={{
				// 지도의 중심좌표
				lat: 33.450701,
				lng: 126.570667,
			}}
			style={MapStyle}
			level={3} // 지도의 확대 레벨
			isPanto={position.isPanto}
		/>
	);
}
