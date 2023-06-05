import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
// import { CookiesProvider } from "react-cookie";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
