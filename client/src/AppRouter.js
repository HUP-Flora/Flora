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
import ReservationType from "./pages/reservation/ReservationType";
import ReservationDate from "./pages/reservation/ReservationDate";

// 가게 상세 페이지
import StoreDetail from "./pages/storeDetail/StoreDetail";

// 상품 페이지
import ProductDetail from "./pages/product/ProductDetail";
import ProductForms from "./pages/product/ProductForms";

// 마이 페이지
import MyPage from "./pages/myPage/MyPage";
import Review from "./pages/myPage/Review";
import UserDelete from "./pages/myPage/UserDelete";
import OrderDetail from "./pages/myPage/OrderDetail";

// 꽃갈피 페이지
import FloMark from "./pages/floMark/FloMark";

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
				{/* 가게 상세 페이지 */}
				<Route path="/store" element={<StoreDetail />} />
				{/* <Route path="/store/:id" element={<StoreDetail />} /> */}
				{/* 상품 페이지 */}
				<Route path="/productDetail" element={<ProductDetail />} />
				{/* <Route path="/store/:id/:productId" element={<ProductDetail />} /> */}
				<Route path="/productAdd" element={<ProductForms />} />
				<Route path="/productEdit" element={<ProductForms />} />
				// 예약 페이지들
				<Route path="/reservation/type" element={<ReservationType />} />
				<Route path="/reservation/date" element={<ReservationDate />} />
				{/* 마이페이지 */}
				<Route path="/myPage" element={<MyPage />} />
				<Route path="/review" element={<Review />} />
				<Route path="/userDelete" element={<UserDelete />} />
				<Route path="/orderDetail" element={<OrderDetail />} />
				{/* 꽃갈피 페이지 */}
				<Route path="/floMark" element={<FloMark />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
