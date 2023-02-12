import hamsterImg from "./8471-hamster-wheel-loading.gif"
import { useOrdersApi } from "../../hooks/useOrdersApi";

function Hamster() {
	const { getOrderDetail } = useOrdersApi();

	return (
		<>
		<img src={hamsterImg} alt="hamsterImg" style={{width: "50%", height: "50%"}}/>
			<button onClick={() => getOrderDetail(1)}>테스트</button>
		</>
	);
}

export default Hamster;