import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Flolive from "../pages/flolive/Flolive";

function AppRouter() {
	return (
		<Router>
			<Routes>
				<Route path="/flolive" element={<Flolive />} />
			</Routes>
		</Router>
	);
}

export default AppRouter;
