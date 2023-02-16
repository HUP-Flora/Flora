import lottie from "lottie-web";
import React from "react";
import { NotFoundContainer } from "../../styles/notFound/NotFoundStyle";
import { useNavigate } from "react-router-dom";

function NotFound() {
	const loadingLottie = React.useRef();
	React.useEffect(() => {
		lottie.loadAnimation({
			container: loadingLottie.current,
			renderer: "svg",
			loop: true,
			autoplay: true,
			animationData: require("../../assets/notFound/notFound404_01.json"),
		});
	}, []);

	const navigate = useNavigate();

	return (
		<NotFoundContainer>
			<div ref={loadingLottie}></div>
			<p>죄송합니다.<br/>페이지를 찾을 수 없습니다.</p>
			<button onClick={() => navigate("/")}>홈으로 돌아가기</button>
		</NotFoundContainer>
	);
}

export default NotFound;
