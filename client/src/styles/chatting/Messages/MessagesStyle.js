import styled from "styled-components";
import BasicScrollToBottom from "react-scroll-to-bottom";

export const ChatList = styled(BasicScrollToBottom)`
	padding: 16px 0 0 0;
	overflow: scroll;
	flex: auto;
	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none; /* 인터넷 익스플로러 */
	scrollbar-width: none; /* 파이어폭스 */
`;
