import hamsterImg from "./8471-hamster-wheel-loading.gif"
import { useOrdersApi } from "../../hooks/useOrdersApi";
import useFloliveOwner from "../../hooks/useFloliveOwner";
import useOrderDetail from "../../hooks/useOrderDetail";

function Hamster() {
	const { getOrderDetail } = useOrdersApi();
	const { accepteFlolive } = useFloliveOwner();
	const { changeOrderStatusAPI } = useOrderDetail();

	return (
		<>
		<img src={hamsterImg} alt="hamsterImg" style={{width: "50%", height: "50%"}}/>
			<button onClick={() => changeOrderStatusAPI(95)}>테스트</button>
		</>
	);
}

export default Hamster;