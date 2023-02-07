import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { KakaoPaymentSuccess } from "./pages/kakaoPayment/KakaoPaymentSuccess";

// 메인 페이지
import { Main } from "./pages/Main";

// 로그인 / 회원가입 페이지
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { SignupOwner } from "./pages/auth/SignupOwner";
import { SignupUser } from "./pages/auth/SignupUser";
import { SignupOwnerStore } from "./pages/auth/SignupOwnerStore";

// 꽃집 검색 페이지
import { Search } from "./pages/search/Search";

// 가게 상세 페이지
import StoreDetail from "./pages/storeDetail/StoreDetail";

// 가게 정보 수정 페이지

// 상품 페이지
import ProductDetail from "./pages/product/ProductDetail";
import ProductForms from "./pages/product/ProductForms";

// 예약 페이지
import ReservationType from "./pages/reservation/ReservationType";
import ReservationDate from "./pages/reservation/ReservationDate";
import ReservationComplete from "./pages/reservation/ReservationComplete";

// 플로라이브 페이지
import Flolive from "./pages/flolive/Flolive";
// 마크업 테스트
import FloliveTest from "./pages/flolive/FloliveTest";

// 마이 페이지
import OrderDetail from "./pages/orderDetail/orderDetail";
import MyPage from "./pages/myPage/MyPage";
import Review from "./pages/myPage/Review";
import UserDelete from "./pages/myPage/UserDelete";
import OrdersList from "./pages/myPage/OrdersList";

// 꽃갈피 페이지
import FloMark from "./pages/floMark/FloMark";

// 채팅 테스트용 페이지
import Chatting from "./components/chatting/Chatting";
import Join from "./components/chatting/Join";

// 카카오 결제 테스트용 페이지
import { KakaoPayment } from "./pages/kakaoPayment/KakaoPayment";

// 예약 내역 페이지
import ReservationList from "./pages/reservation/ReservationList";

function AppRouter() {
	return (
		<Router>
			<Routes>
				{/* 메인페이지 */}
				<Route path="/" exact={true} element={<Main />} />

				{/* 검색 페이지 */}
				<Route path="/search" element={<Search />} />

				{/* 로그인 / 회원가입 페이지 */}
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signup/user" element={<SignupUser />} />
				<Route path="/signup/owner" element={<SignupOwner />} />
				<Route path="/signup/owner/store" element={<SignupOwnerStore />} />

				{/* 가게 상세 페이지 */}
				<Route path="/store/detail" element={<StoreDetail />} />
				{/* <Route path="/store/:store-id/detail" element={<StoreDetail />} /> */}

				{/* 가게 정보 수정 페이지 */}
				{/* <Route path="/store/:store-id/edit" element={<StoreEdit />} /> */}

				{/* 상품 페이지 */}
				<Route path="/productDetail" element={<ProductDetail />} />
				{/* <Route path="/product/:product-id" element={<ProductDetail />} /> */}
				<Route path="/product/add" element={<ProductForms />} />
				<Route path="/product/edit" element={<ProductForms />} />
				{/* <Route path="/product/:product-id/edit" element={<ProductForms />} /> */}

				{/* 예약 페이지 */}
				{/*<Route path="/product/:product-id/reservation/type" element={<ReservationType />} />*/}
				{/*<Route path="/product/:product-id/reservation/date" element={<ReservationDate />} />*/}
				{/*<Route path="/product/:product-id/reservation/complete" element={<ReservationComplete />} />*/}

				{/*예약 페이지 테스트*/}
				<Route path="/reservation/type" element={<ReservationType />} />
				<Route path="/reservation/date" element={<ReservationDate />} />
				<Route path="/reservation/complete" element={<ReservationComplete />} />

				{/* 플로라이브 페이지 */}
				<Route path="/flolive" element={<Flolive />} />
				{/* 마크업 테스트 */}
				<Route path="/flolive-test" element={<FloliveTest />} />
				{/* <Route path="/flolive/:session-id" element={<Flolive />} /> */}
				<Route path="/kakao-payment/success" element={<KakaoPaymentSuccess />} />

				{/* 마이페이지 */}
				<Route path="/mypage" element={<MyPage />} />
				<Route path="/mypage/order/list" element={<OrdersList />} />
				{/*<Route path="/mypage/order/:order-id" element={<OrderDetail />} />*/}
				<Route path="/mypage/order/detail" element={<OrderDetail />} />
				<Route path="/mypage/review/list" element={<Review />} />
				<Route path="/mypage/signout" element={<UserDelete />} />

				{/* 꽃갈피 페이지 */}
				<Route path="/floMark/list" element={<FloMark />} />

				{/* 예약 내역 페이지 */}
				<Route path="/reservation/list" element={<ReservationList />} />

				{/* 채팅 테스트용 페이지 */}
				<Route path="/join" element={<Join />} />
				<Route path="/chat" element={<Chatting />} />

				{/* 카카오 결제 테스트용 페이지 */}
				<Route path="/kakao-payment" element={<KakaoPayment />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
