import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { KakaoPayment } from "./pages/KakaoPayment";
import { KakaoPaymentSuccess } from "./pages/KakaoPaymentSuccess";

import Flolive from "./pages/flolive/Flolive";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/flolive" element={<Flolive />} />
				<Route path="/kakao-payment" element={<KakaoPayment />} />
				<Route path="/kakao-payment/success" element={<KakaoPaymentSuccess />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
