import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { KakaoPayment } from "./pages/KakaoPayment";
import { KakaoPaymentSuccess } from "./pages/KakaoPaymentSuccess";

import Flolive from "./pages/flolive/Flolive";

// 채팅 테스트용 페이지
import Chatting from "./components/chatting/Chatting";
import Join from "./components/chatting/Join";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/flolive" element={<Flolive />} />
				<Route path="/kakao-payment" element={<KakaoPayment />} />
				<Route path="/kakao-payment/success" element={<KakaoPaymentSuccess />} />
				// 채팅 테스트용 페이지
				<Route path="/join" element={<Join />} />
				<Route path="/chat" element={<Chatting />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
