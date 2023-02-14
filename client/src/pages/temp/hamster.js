import hamsterImg from "./8471-hamster-wheel-loading.gif"
import { useOrdersApi } from "../../hooks/useOrdersApi";
import useFloliveOwner from "../../hooks/useFloliveOwner";
import useOrderDetail from "../../hooks/useOrderDetail";
import io from "socket.io-client";

function Hamster() {
	const { getOrderDetail } = useOrdersApi();
	const { accepteFlolive } = useFloliveOwner();
	const { changeOrderStatusAPI } = useOrderDetail();

	const testSocket = () => {
		const io = require("socket.io-client");
		io("https://i8b203.p.ssafy.io:4000")
	}


	return (
		<>
		<img src={hamsterImg} alt="hamsterImg" style={{width: "50%", height: "50%"}}/>
			<button onClick={() => testSocket()}>테스트</button>
		</>
	);
}

export default Hamster;