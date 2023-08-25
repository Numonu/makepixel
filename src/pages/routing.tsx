import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./create/create";
import Gallery from "./gallery/gallery";
import Auth from "./auth/auth";
import GlobalHead from "../global/components/organisms/GlobalHead";
import UserProvider from "../global/provider/UserProvider";
import Profile from "./profile/profile";

export default function Routing() {
	return (
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<GlobalHead />}>
						<Route index element={<Gallery />} />
						<Route path="/create" element={<Create />} />
						<Route path="/profile/:uid" element={<Profile />} />
					</Route>
					<Route path="/auth" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</UserProvider>
	);
}
