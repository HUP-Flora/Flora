import { useEffect } from "react";
import { CookiesProvider } from "react-cookie";
import AppRouter from "./AppRouter";
import { AppContainer } from "./styles/common/CommonStyle";

function App() {
	return (
		<AppContainer>
			<CookiesProvider>
				<AppRouter />
			</CookiesProvider>
		</AppContainer>
	);
}

export default App;
