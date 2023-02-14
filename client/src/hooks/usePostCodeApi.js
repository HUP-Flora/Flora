import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDaumPostShowState, receiveUserFirstAddressState } from "../recoil/chatting";
import { locationState } from "../recoil/map";
import { addressState } from "../recoil/searchBar";
import { storeFirstAddressState, storeRegionDepthNameState } from "../recoil/signup";

export const usePostCodeApi = () => {
	const setLocation = useSetRecoilState(locationState);
	const setStoreRegionDepthNameState = useSetRecoilState(storeRegionDepthNameState);
	const location = useRecoilValue(locationState);
	const setReceiveUserFirstAddress = useSetRecoilState(receiveUserFirstAddressState);
	const setStoreFirstAddress = useSetRecoilState(storeFirstAddressState);
	const setAddress = useSetRecoilState(addressState);
	const setIsDaumPostShowState = useSetRecoilState(isDaumPostShowState);

	const postCodeApi = data => {
		console.log(data);
		axios({
			method: "GET",
			url: `https://dapi.kakao.com/v2/local/search/address.json?&query=${data}`,
			headers: {
				Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_ADMIN_KEY}`,
			},
		})
			.then(response => {
				console.log(response.data);
				const { address_name, region_1depth_name, region_2depth_name, region_3depth_name, x, y } =
					response.data.documents[0].address;
				setLocation({ center: { lat: y, lng: x }, isPanto: true });
				setStoreFirstAddress(address_name);
				setStoreRegionDepthNameState({
					region_1depth_name,
					region_2depth_name,
					region_3depth_name,
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	return postCodeApi;
};
