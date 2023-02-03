import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { KakaoPayment } from "./pages/kakaoPayment/KakaoPayment";
import { KakaoPaymentSuccess } from "./pages//kakaoPayment/KakaoPaymentSuccess";

import Flolive from "./pages/flolive/Flolive";
import { Main } from "./pages/Main";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { SignupOwner } from "./pages/auth/SignupOwner";
import { SignupUser } from "./pages/auth/SignupUser";

// 채팅 테스트용 페이지
import Chatting from "./components/chatting/Chatting";
import Join from "./components/chatting/Join";
import { SignupOwnerStore } from "./pages/auth/SignupOwnerStore";

// 가게 상세 페이지
import StoreDetail from "./pages/storeDetail/StoreDetail";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/" exact={true} element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signup/owner" element={<SignupOwner />} />
				<Route path="/signup/owner/store" element={<SignupOwnerStore />} />
				<Route path="/signup/user" element={<SignupUser />} />
				<Route path="/flolive" element={<Flolive />} />
				<Route path="/kakao-payment" element={<KakaoPayment />} />
				<Route path="/kakao-payment/success" element={<KakaoPaymentSuccess />} />
				// 채팅 테스트용 페이지
				<Route path="/join" element={<Join />} />
				<Route path="/chat" element={<Chatting />} />
				// 가게 상세 페이지
				<Route path="/store" element={<StoreDetail />} />
				{/* <Route path="/store/:id" element={<StoreDetail />} /> */}
			</Routes>
		</Router>
	);
}

export default AppRouter;
