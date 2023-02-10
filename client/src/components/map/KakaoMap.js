import { useEffect, useRef, useMemo } from "react";
import { Map, MapMarker, ZoomControl } from "react-kakao-maps-sdk";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationState } from "../../recoil/map";
import { storeListState } from "../../recoil/search";
import { MapMarkerStyle, MapStyle } from "../../styles/map/MapStyle";

const { kakao } = window;

export function KakaoMap() {
	const [position, setPosition] = useRecoilState(locationState);
	const storeList = useRecoilValue(storeListState);

	const mapRef = useRef();
	const bounds = useMemo(() => {
		const bounds = new kakao.maps.LatLngBounds();
		storeList.forEach(store => {
			bounds.extend(new kakao.maps.LatLng(store.lat, store.lng));
		});
		return bounds;
	}, [storeList]);

	useEffect(() => {
		if (mapRef.current) {
			mapRef.current.setBounds(bounds);
		}
	}, [bounds]);

	// const handlePosition = (lat, lng, isPanto) => {
	// 	setPosition({
	// 		center: { lat: lat, lng: lng },
	// 		isPanto: isPanto,
	// 	});
	// };

	// const handleSearch = () => {
	// 	// 1. axios로 위도 경도 데이터 받기
	// 	// 2. position 변경
	// 	handlePosition(33.452613, 126.570888, false);
	// };

	return (
		<Map // 지도를 표시할 Container
			center={{
				// 지도의 중심좌표
				lat: 36.3549777,
				lng: 127.2983403,
			}}
			style={MapStyle}
			level={3} // 지도의 확대 레벨
			ref={mapRef}
		>
			{storeList.map(store => (
				<MapMarker // 마커를 생성합니다
					key={store.sid}
					position={{
						lat: store.lat,
						lng: store.lng,
					}}
					image={MapMarkerStyle}
				/>
			))}
			<ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
		</Map>
	);
}
