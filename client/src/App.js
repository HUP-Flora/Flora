import AppRouter from "./components/AppRouter";
import { PhoneStatusHeader } from "./components/common/PhoneStatusHeader";
import { AppContainer } from "./styles/common/AppStyle";

function App() {
	return (
		<AppContainer>
			<PhoneStatusHeader />
			<AppRouter />
		</AppContainer>
	);
}

export default App;
