import { User } from "firebase/auth";
import { ReactNode, useState } from "react";
import { onAuthStateChanged } from "firebase/auth/cordova";
import { auth } from "../../lib/firebase.config";
import { userContext } from "./context/userContext";

type UserProviderTypes = {
	children: ReactNode;
};
export default function UserProvider({ children }: UserProviderTypes) {
	const [user, setUser] = useState<null | User>(null);

	onAuthStateChanged(auth, (user) => {
		setUser(user);
	});

	return (
		<userContext.Provider
			value={user}
		>
			{children}
		</userContext.Provider>
	);
}
