import styled from "styled-components";
import { Text } from "../common/CommonStyle";

export const FloMarkImage = styled.img`
	width: 14px;
	height: 14px;
`;

export const ArrowImage = styled.img`
	cursor: pointer;
`;

export const SearchIcon = styled.img`
cursor: pointer;
position: absolute;
top: 20%;
left: 90%;
transform: translate(0%, 0%)
	width: 19px;
	height: 19px;
`;

export const BigSearchAddressIcon = styled.img`
	width: ${props => props.size || 40}px;
	height: ${props => props.size || 40}px;
	margin-bottom: 8px;
`;

export const AddressItem = styled(Text)`
	cursor: pointer;
`;

export const SearchBarIcon = styled.img`
	width: 19px;
	height: 19px;

	cursor: pointer;

	position: absolute;
	top: 50%;
	left: 95%;
	transform: translate(-50%, -50%);
`;

export const PencilIcon = styled.img`
	width: 23px;
	height: 23px;
`;
