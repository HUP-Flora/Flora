import styled from "styled-components";

export const MapStyle = {
	width: "100%",
	height: "280px",
};

export const MapMarkerStyle = {
	src: require("../../assets/map/FloMarker.png"),
	size: {
		width: 40,
		height: 40,
	},
};

export const StoreListBottomSheet = styled.div`
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	background-color: var(--gray-50);
	box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.15);

	position: fixed;
	bottom: 0px;
	width: 100%;
	height: ${props => (props.isLarge ? "calc(100% - 120px)" : "calc(100% - 350px)")};
	z-index: 1;

	transition: all 0.4s ease;
`;

export const ArrowSection = styled.div`
	text-align: center;
	margin-top: 16px;
	margin-bottom: 16px;
`;

export const StoreListSection = styled.div`
	height: 100%;
	padding-top: 16px;
	padding-left: 16px;
	padding-right: 16px;
	overflow-y: auto;

	position: relative;
`;
