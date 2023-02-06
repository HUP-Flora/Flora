import { useEffect } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useRecoilState } from "recoil";
import { levelState, locationState } from "../../recoil/map";
import { MapMarkerStyle, MapStyle } from "../../styles/map/MapStyle";
import { stores } from "./dummydata";

const { kakao } = window;

export function KakaoMap() {
	const [position, setPosition] = useRecoilState(locationState);
	// const [level, setLevel] = useRecoilState(levelState);

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
				lat: position.center.lat,
				lng: position.center.lng,
			}}
			style={MapStyle}
			level={3} // 지도의 확대 레벨
			isPanto={position.isPanto}
		>
			{stores.map(store => (
				<MapMarker // 마커를 생성합니다
					key={store.sId}
					position={{
						lat: store.sLat,
						lng: store.sLng,
					}}
					clickable={true}
					image={MapMarkerStyle}
				/>
			))}
			<ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
		</Map>
	);
}
