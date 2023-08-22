import React from "react";
import ReactDOM from "react-dom/client";
import "./global/styles/defaults.css";
import "./global/styles/animations.css";
import Routing from "./pages/routing";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<div className="bg-white text-title ">
			<Toaster/>
			<Routing />
		</div>
	</React.StrictMode>
);
