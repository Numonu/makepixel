import React from "react";
import ReactDOM from "react-dom/client";
import "./global/styles/defaults.css";
import "./global/styles/animations.css";
import Routing from "./pages/routing";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="bg-white text-neutral-800">
			<Routing />
		</div>
	</React.StrictMode>
);
