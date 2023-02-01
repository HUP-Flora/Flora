import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { GlobalFonts } from "./fonts/fonts";
import ReactDOM from "react-dom/client";
import "./styles/common/App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<RecoilRoot>
			<GlobalFonts />
			<App />
		</RecoilRoot>
	</React.StrictMode>
);
