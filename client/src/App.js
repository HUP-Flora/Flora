import { Route, Routes } from "react-router-dom";
import { PhoneStatusHeader } from "./components/common/PhoneStatusHeader";
import { KakaoPayment } from "./pages/KakaoPayment";
import { KakaoPaymentSuccess } from "./pages/KakaoPaymentSuccess";
import { AppContainer } from "./styles/common/AppStyle";

function App() {
  return (
    <AppContainer>
      <PhoneStatusHeader />
      <Routes>
        <Route path="/kakao-payment" element={<KakaoPayment />} />
        <Route
          path="/kakao-payment/success"
          element={<KakaoPaymentSuccess />}
        />
      </Routes>
    </AppContainer>
  );
}

export default App;
