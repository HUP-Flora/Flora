import { useEffect } from "react";
import { KakaoMapSection } from "../../styles/map/MapStyle";

const { kakao } = window;

export function KakaoMap() {
	useEffect(() => {
		const container = document.getElementById("map");
		const options = {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3,
		};
		const map = new kakao.maps.Map(container, options);
	}, []);

	return <KakaoMapSection id="map"></KakaoMapSection>;
}
