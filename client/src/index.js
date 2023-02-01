import React from "react";
import { RecoilRoot } from "recoil";
import { GlobalFonts } from "./fonts/fonts";
import ReactDOM from "react-dom/client";
import "./App.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<RecoilRoot>
		<GlobalFonts />
		<App />
	</RecoilRoot>
);
